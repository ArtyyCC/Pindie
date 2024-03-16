"use client"
import {AuthForm} from "@/app/components/AuthForm/AuthForm";
import Styles from "./authPage.module.css";
import {useState} from "react";

const Page = () => {

    const checkBox = document.getElementById("authStateTestCheckBox")
    const [authState, setAuthState] = useState("false")
    const onsCheckBox = () => {
        const checkbox = document.getElementById('authStateTestCheckBox')
        if (checkbox.checked == false) {
            setAuthState("true")
            localStorage.setItem("authState" ,authState)
        } else {
            setAuthState("false")
            localStorage.setItem("authState" ,authState)
        }
    }
    return (

        <div className={Styles['pageContainer']}>
            <section className={Styles['leftSectionContainer']}>
                <AuthForm/>
            </section>
            {/* я это уберу */}
            <section className={Styles['rightSectionContainer']}>
                <p>Test auth check </p>
                <input type="checkbox" id="authStateTestCheckBox" name="authState" onClick={onsCheckBox}/>
                <img
                    src="/images/photo_2024-02-18_22-46-19.jpg"
                    alt="dev tool"
                    className={Styles['devImage']}
                />

            </section>
        </div>
    );
};

export default Page;