"use client"
import Styles from "./Game.module.css";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {endpoints} from '@/app/api/config';
import {checkIfUserVoted, getJWT, getMe, getNormalizedGameDataById, isResponseOk, removeJWT} from "@/app/api/api utils";
import {Preloader} from "@/app/components/Preloader/Preloader";

export default function GamePage(props) {
    const [preloaderVisible, setPreloaderVisible] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isVoted, setIsVoted] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)
    const [game, setGame] = useState(null)
    const [usersScore, setUsersScore] = useState(null);
    const router = useRouter()
    useEffect(() => {
        async function fetchData() {
            const game = await getNormalizedGameDataById(endpoints.games, props.params.id);
            isResponseOk(game) ? setGame(game) : setGame(null);
            isResponseOk(game) ? setUsersScore(game.users.length) : setUsersScore(null);
            setPreloaderVisible(false);
        }
        fetchData()
    }, []);
    useEffect(() => {
        const jwt = getJWT()
        if (jwt) {
            getMe(endpoints.me, jwt).then((userData) => {
                if (isResponseOk(userData)) {
                    setIsAuthorized(true)
                    setCurrentUser(userData)
                } else {
                    setIsAuthorized(false)
                    removeJWT()
                }
            })
        }
    })
    useEffect(() => {
        if (currentUser && game) {
            setIsVoted(checkIfUserVoted(game, currentUser.id));
        } else {
            setIsVoted(false);
        }
    }, [currentUser, game]);
    const handleVote = async () => {
        const jwt = getJWT();
        if (isVoted === false) {
            let usersIdArray = game.users.length
                ? game.users.map((user) => user.id)
                : [];
            usersIdArray.push(currentUser.id);
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
                        users: [...game.users, currentUser],
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
                            <button onClick={handleVote} disabled={!isAuthorized || isVoted} className={`button ${Styles["about__vote-button"]}`}>{isVoted ? "Голос учтён" : "Голосовать"}</button>
                        </div>
                    </section>
                </>
            ) : preloaderVisible ? (
                <Preloader/>
            ) : (router.push('/games/notfound'))}
        </main>
    )
}


