'use client'
import Image from "next/image";
import Styles from "./aboutme.module.css";
import { useStore } from "@/app/store/app-store";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Preloader} from "../components/Preloader/Preloader";

export default function Me() {
    const router = useRouter();
    const [preloaderVisible, setPreloaderVisible] = useState(false);
    const authContext = useStore();

    const handleLogout = async () => {
        setPreloaderVisible(false);
        authContext.logout();
        router.push("/");
    };

    useEffect(() => {
        if (authContext.user !== undefined && authContext.user !== false) {
            setPreloaderVisible(true);
        }
    }, [authContext.isAuth]);

    if (authContext.isAuth === false) {
        useEffect(() => {
            router.push('/');
        }, []);
        return null;
    }

    return (
        <>
            {preloaderVisible ? (
                <main className={Styles["wrapper"]}>
                    <section className={Styles["section_wraper"]}>
                    </section>
                </main>
            ) : (
                <Preloader/>
            )}
        </>
    );
};