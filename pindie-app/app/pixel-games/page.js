"use client"
import CardList from "@/app/components/CardList/CardList";
import {endpoints} from "@/app/api/config";
import {useGetDataByCategory} from "@/app/api/api-hooks";
import {Preloader} from "@/app/components/Preloader/Preloader";

function Page() {
    const pixelGames = useGetDataByCategory(endpoints.games, "pixel");
    return (
        <main className="main-inner">
            {pixelGames ? (
                <CardList id="pixel" title="Пиксельные" data={pixelGames} />
            ) : (
                <Preloader/>
            )}
        </main>
    );
}


export default Page;