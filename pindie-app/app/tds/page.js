import CardList from "@/app/components/CardList/CardList";
import {getGamesByCategory} from "@/app/data/data-utils";

// API возращает пустой массив, пришлось оставить локальый репозиторий с данными
const tds = () => {
    const tdsGames = getGamesByCategory("TDS");
    return (
        <main>
            <CardList data={tdsGames} id={"TDS"} title={"TDS"}/>
        </main>
    );
};

export default tds;