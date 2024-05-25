"use client"
import Styles from "./Game.module.css";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {endpoints} from '@/app/api/config';
import {checkIfUserVoted, getNormalizedGameDataById, isResponseOk, vote} from "@/app/api/api utils";
import {Preloader} from "@/app/components/Preloader/Preloader";
import {useStore} from '@/app/store/app-store';


export default function GamePage(props) {
    const store = useStore();

    const [isVoted, setIsVoted] = useState(false);

    const [preloaderVisible, setPreloaderVisible] = useState(true);
    const [game, setGame] = useState(null);


    useEffect(() => {
        async function fetchData() {
            const game = await getNormalizedGameDataById(
                endpoints.games,
                props.params.id
            );
            isResponseOk(game) ? setGame(game) : setGame(null);
            setPreloaderVisible(false);

        }
        fetchData();
    }, []);
    useEffect(() => {
        store.user && game ? setIsVoted(checkIfUserVoted(game, store.user.id)) : setIsVoted(false);
    }, [store.user, game]);

    const handleVote = async () => {
        const jwt = store.token;
        let usersIdArray = game.users.length
            ? game.users.map((user) => user.id)
            : [];
        usersIdArray.push(store.user.id);
        const response = await vote(
            `${endpoints.games}/${game.id}`,
            jwt,
            usersIdArray
        );
        if (isResponseOk(response)) {
            setGame(() => {
                return {
                    ...game,
                    users: [...game.users, store.user]
                };
            });
            setIsVoted(true);
        }
    };
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
                                className={Styles["about__accent"]}>{game.users.length}</span></p>
                            <button onClick={handleVote} disabled={!store.isAuth || isVoted} className={`button ${Styles["about__vote-button"]}`}>{isVoted ? "Голос учтён" : "Голосовать"}</button>
                        </div>
                    </section>
                </>
            ) : preloaderVisible ? (
                <Preloader/>
            ) : (router.push('/games/notfound'))}
        </main>
    )
}


