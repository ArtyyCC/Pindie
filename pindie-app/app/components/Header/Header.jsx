"use client"
import Styles from './Header.module.css'
import {useEffect, useState} from "react";
import {Overlay} from "@/app/components/Overlay/Overlay";
import {Popup} from "@/app/components/Popup/Popup";
import {AuthForm} from "@/app/components/AuthForm/AuthForm";
import Link from "next/link";
import LogoImg from "@/app/components/logo/LogoImg";
import LogoLink from "@/app/components/logo/LogoLink"
import { usePathname } from "next/navigation";
import {getJWT, getMe, isResponseOk, removeJWT} from "@/app/api/api utils";
import {endpoints} from "@/app/api/config";

export const Header = () => {
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);
    // handling of authorisation pop-up window

    const [popupIsOpend,setPopupIsoppened] = useState(false)
    // function for opening the authorisation window
    const openPopup = () => {
        setPopupIsoppened(true)
    }
    // function for closing the authorisation window
    const closePopup = () => {
        setPopupIsoppened(false)
    }
    useEffect(() => {
        const jwt = getJWT()
        if (jwt) {
            getMe(endpoints.me, jwt).then((userData) => {
                if (isResponseOk(userData)) {
                    setIsAuthorized(true)
                } else {
                    setIsAuthorized(false)
                    removeJWT()
                }
            })
        }
    })
    const hundleLogout = () => {
        setIsAuthorized(false)
        removeJWT()
    }
    return (
        <header className={Styles['header']}>
            {pathname === '/' ? <LogoImg/> : <LogoLink/>}
            <nav className={Styles['menu']}>
                <ul className={Styles['menu__list']}>
                    <li className={Styles['menu__item']}>
                        <Link href="/new" className={`${Styles["menu__link"]} ${pathname === "/new" ? Styles["menu__link_active"] : ""}`}>
                            Новинки
                        </Link>
                    </li>
                    <li className={Styles['menu__item']}>
                        <Link href="/popular" className={`${Styles["menu__link"]} ${pathname === "/popular" ? Styles["menu__link_active"] : ""}`}>
                            Популярные
                        </Link>
                    </li>
                    <li className={Styles['menu__item']}>
                        <Link href="/shooters" className={`${Styles["menu__link"]} ${pathname === "/shooters" ? Styles["menu__link_active"] : ""}`}>
                            Шутеры
                        </Link>
                    </li>
                    <li className={Styles['menu__item']}>
                        <Link href="/runners" className={`${Styles["menu__link"]} ${pathname === "/runners" ? Styles["menu__link_active"] : ""}`}>
                            Ранеры
                        </Link>
                    </li>
                    <li className={Styles['menu__item']}>
                        <Link href="/pixel-games" className={`${Styles["menu__link"]} ${pathname === "/pixel-games" ? Styles["menu__link_active"] : ""}`}>
                            Пиксельные
                        </Link>
                    </li>
                    <li className={Styles['menu__item']}>
                        <Link href="tds" className={`${Styles["menu__link"]} ${pathname === "/tds" ? Styles["menu__link_active"] : ""}`}>
                            TDS
                        </Link>
                    </li>
                </ul>
                <div className={Styles['auth']}>
                    {isAuthorized ?
                        (<button onClick={hundleLogout} className={Styles['auth__button']}>Выйти</button>)
                        :
                        (<button onClick={openPopup} className={Styles['auth__button']}>Войти</button>)
                    }
                </div>
            </nav>
            <Overlay isOpened={popupIsOpend} closePopup={closePopup}  />
            <Popup isOpened={popupIsOpend} closePopup={closePopup}>
                <AuthForm  close={closePopup} setAuth={setIsAuthorized}/>
            </Popup>
        </header>
    )
}
