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
import {useStore} from '@/app/store/app-store';


export const Header = () => {
    const pathname = usePathname();
    const authContext = useStore();
    const handleLogout = () => {
        authContext.logout();
    };
    const [popupIsOpend,setPopupIsoppened] = useState(false)
    // function for opening the authorisation window
    const openPopup = () => {
        setPopupIsoppened(true)
    }
    // function for closing the authorisation window
    const closePopup = () => {
        setPopupIsoppened(false)
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
                    {authContext.isAuth ?
                        (<button onClick={handleLogout} className={Styles['auth__button']}>Выйти</button>)
                        :
                        (<button onClick={openPopup} className={Styles['auth__button']}>Войти</button>)
                    }
                </div>
            </nav>
            <Overlay isOpened={popupIsOpend} closePopup={closePopup}  />
            <Popup isOpened={popupIsOpend} closePopup={closePopup}>
                <AuthForm  close={closePopup}/>
            </Popup>
        </header>
    )
}
