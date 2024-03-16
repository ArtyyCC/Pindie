import CardList from "@/app/components/CardList/CardList";
import {getGamesByCategory} from "@/app/data/data-utils";
import {getNormalizedGamesDataByCategory} from "@/app/api/api utils";
import {endpoints} from "@/app/api/config";

const Page = async () => {
    const pixelGames = await getNormalizedGamesDataByCategory(endpoints.games, "pixel")
    return (
        <CardList data={pixelGames} id={"pixel"} title={"Пиксельные"}/>
    );
};

export default Page;