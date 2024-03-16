import CardList from "@/app/components/CardList/CardList";
import {getGamesByCategory} from "@/app/data/data-utils";
import {getNormalizedGamesDataByCategory} from "@/app/api/api utils";
import {endpoints} from "@/app/api/config";

const popular = async () => {
    const popularGames = await getNormalizedGamesDataByCategory(endpoints.games, "popular")
    return (
        <main>
            <CardList data={popularGames} id="popular" title="Популярные"/>
        </main>
    );
};

export default popular;