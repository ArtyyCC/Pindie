"use client"
import Styles from './Promo.module.css';
import {useState, useEffect} from "react";
const Promo = () => {
    const [codeIsVisible,setcodeIsVisible] = useState(false)
    // function of hiding the promo code after the timer expires
    useEffect(() => {
        let timeout;
        if (codeIsVisible) {
            timeout = setTimeout(() => {
                setcodeIsVisible(false);
            },5000);
        }
        return () => {
            clearTimeout(timeout);
        }
    }, [codeIsVisible]); // check variable updating
    // function for changing the displayed content
    const handleButtonClick = () => {
        setcodeIsVisible(!codeIsVisible)
    }
    return (
        <section className={Styles['promo']}>
            <div className="promo__description-block">
                <h2 className={Styles['promo__title']}>Твой промо-код</h2>
                <p className={Styles['promo__description']}>Скидка на все курсы Яндекс Практикума для пользователей нашего
                    сайта!</p>
                <button onClick={handleButtonClick} className={`button ${Styles['promo__button']}`}>{codeIsVisible === true ?
                    <span className={Styles["promo-code"]}>WEBTEENS10</span> : "Получить код"}</button>
            </div>
            <img src="./images/promo-illustration.svg" alt="Собака" className={Styles['promo__image']}/>
        </section>
    );
};

export default Promo;

