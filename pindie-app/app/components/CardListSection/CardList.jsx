import Styles from "./CardsListSection.module.css";
import {Card} from "@/app/components/Card/Card";
import Link from "next/link";

const CardList = (props) => {
    return (
        <ul className={Styles["cards-list"]}>
            {props.data.map((item) => {
                return (
                    <li className={Styles["cards-list__item"]} key={item.id}>
                        <Link href={`/games/${item.id}`} className={Styles["card-list__link"]}>
                            <Card
                                {...item}
                            />
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default CardList;