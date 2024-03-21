"use client"
import {Header} from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import {useStore} from '@/app/store/app-store';
import {useEffect, useState} from "react";
import Styles from "@/app/components/Header/Header.module.css";
import Link from "next/link";

export const App = (props) => {
    const store = useStore();
    const [visibleProfile, setVisibleProfile] = useState(false);
    useEffect(() => {
        if (store.isAuth === true) {
            setVisibleProfile(true)
        } else {
            setVisibleProfile(false)
        }
    }, [store.isAuth]);
    useEffect(() => {
        store.checkAuth();
    }, []);
    return(
        <>
            <Header />
            { visibleProfile ? (<Link href="/me" className={"menu__link_profile"}>
                Учётная запись
            </Link>) : null }
            {props.children}
            <Footer />
        </>
    );
};

