"use client"
import {Header} from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import {useStore} from '@/app/store/app-store';
import {useEffect} from "react";
import Styles from "@/app/components/Header/Header.module.css";
import Link from "next/link";

export const App = (props) => {
    const store = useStore()
    useEffect(() => {
        store.checkAuth();
    }, []);
    return(
        <>
            <Header />
            <Link href="/me" className={"menu__link_profile"}>
                Учётная запись
            </Link>
            {props.children}
            <Footer />
        </>
    );
};

