"use client"
import Styles from "./CardsListSection.module.css";
import CardList from "@/app/components/CardListSection/CardList";
import CardsSlider from "@/app/components/CardListSection/CardsSlider";

export const CardsListSection = (props) => {
    return (
        <section className={Styles["list-section"]}>
            <h2 className={Styles["list-section__title"]} id={props.id}>
                {props.title}
            </h2>
            {props.type === 'slider' ? <CardsSlider data={props.data} /> : <CardList data={props.data} />}
        </section>
    );
};