"use client"
import Styles from "./Game.module.css";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {endpoints} from '@/app/api/config';
import {checkIfUserVoted, getNormalizedGameDataById, isResponseOk} from "@/app/api/api utils";
import {Preloader} from "@/app/components/Preloader/Preloader";
import {useStore} from '@/app/store/app-store';

// npm run dev
// ЗАПУСКАЕМ
// ░ГУСЯ░▄▀▀▀▄░РАБОТЯГИ░░
// ▄███▀░◐░░░▌░░░░░░░
// ░░░░▌░░░░░▐░░░░░░░
// ░░░░▐░░░░░▐░░░░░░░
// ░░░░▌░░░░░▐▄▄░░░░░
// ░░░░▌░░░░▄▀▒▒▀▀▀▀▄
// ░░░▐░░░░▐▒▒▒▒▒▒▒▒▀▀▄
// ░░░▐░░░░▐▄▒▒▒▒▒▒▒▒▒▒▀▄
// ░░░░▀▄░░░░▀▄▒▒▒▒▒▒▒▒▒▒▀▄
// ░░░░░░▀▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▀▄
// ░░░░░░░░░░░▌▌░▌▌░░░░░
// ░░░░░░░░░░░▌▌░▌▌░░░░░
// ░░░░░░░░░▄▄▌▌▄▌▌░░░░░
// Don't touch the magic code here

export default function GamePage(props) {
    const authContext = useStore();
    const [preloaderVisible, setPreloaderVisible] = useState(true); // TO-DO optimise a large number of useState
    const [isVoted, setIsVoted] = useState(false);
    const [game, setGame] = useState(null)
    const [usersScore, setUsersScore] = useState(null);
    const router = useRouter()
    useEffect(() => {
        async function fetchData() {
            setPreloaderVisible(true);
            const game = await getNormalizedGameDataById(
                endpoints.games,
                props.params.id
            );
            isResponseOk(game) ? setGame(game) : setGame(null);
            setPreloaderVisible(false);
        }
        fetchData();
    }, []);

    useEffect(() => { // Данные о пользователе получаем из контекста authContext.user
        authContext.user && game ? setIsVoted(checkIfUserVoted(game, authContext.user.id)) : setIsVoted(false);
    }, [authContext.user, game]);
    useEffect(() => {
        if (authContext.user && game) {
            setIsVoted(checkIfUserVoted(game, authContext.user.id));
        } else {
            setIsVoted(false);
        }
    }, [authContext.user, game]);
    const handleVote = async () => {
        const jwt = authContext.token
        if (isVoted === false) {
            let usersIdArray = game.users.length
                ? game.users.map((user) => authContext.user.id)
                : [];
            usersIdArray.push(authContext.user.id);
            const response = await vote(
                `${endpoints.games}/${game.id}`,
                jwt,
                usersIdArray
            );
            if (isResponseOk(response)) {
                setIsVoted(true);
                setGame(() => {
                    return {
                        ...game,
                        users: [...game.users, authContext.user.id],
                    };
                });
            }
            alert("Ваш прекрасный голос зачтён!"); // TO-DO replace with a modal component
            setIsVoted(!isVoted);
        } else {
            setUsersScore(game.users)
            alert("Ваш прекрасный голос отменён!") // TO-DO replace with a modal component
            setIsVoted(!isVoted);
        }
    }
    return (
        <main className="main">
            {game ? (
                <>
                    <section className={Styles['game']}>
                        <iframe className={Styles['game__iframe']} src={game.link}></iframe>
                    </section>
                    <section className={Styles['about']}>
                        <h2 className={Styles['about__title']}>{game.title}</h2>
                        <div className={Styles['about__content']}>
                            <p className={Styles["about__description"]}>{game.description}</p>
                            <div className={Styles["about__author"]}>
                                <p>Автор: <span className={Styles["about__accent"]}>{game.developer}</span></p>
                            </div>
                        </div>
                        <div className={Styles["about__vote"]}>
                            <p className={Styles["about__vote-amount"]}>За игру уже проголосовали: <span
                                className={Styles["about__accent"]}>{usersScore}</span></p>
                            <button onClick={handleVote} disabled={!authContext.isAuth || isVoted} className={`button ${Styles["about__vote-button"]}`}>{isVoted ? "Голос учтён" : "Голосовать"}</button>
                        </div>
                    </section>
                </>
            ) : preloaderVisible ? (
                <Preloader/>
            ) : (router.push('/games/notfound'))}
        </main>
    )
}


