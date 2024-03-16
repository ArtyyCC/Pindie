import CardList from "@/app/components/CardList/CardList";
import {getGamesByCategory} from "@/app/data/data-utils";

const shooters = () => {
    const shootersGames = getGamesByCategory("shooter");
    return (
        <main>
            <CardList data={shootersGames} id="shooter" title="Шутеры"/>
        </main>
    );
};

export default shooters;