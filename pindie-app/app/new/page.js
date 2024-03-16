import CardList from "@/app/components/CardList/CardList";
import {endpoints} from "@/app/api/config";
import {getNormalizedGamesDataByCategory} from "@/app/api/api utils";

async function New() {
    const newGames = await getNormalizedGamesDataByCategory(endpoints.games, "new")
    return (
        <div>
            <CardList data={newGames} id="new" title="Новинки"/>
        </div>
    );
}

export default New;

