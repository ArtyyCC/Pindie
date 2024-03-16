import CardList from "@/app/components/CardList/CardList";
import {getGamesByCategory} from "@/app/data/data-utils";

const runners = () => {
    const runnersGames = getGamesByCategory("runner");
    return (
        <main>
            <CardList data={runnersGames} id="runner" title="Ранеры"/>
        </main>
    );
};

export default runners;