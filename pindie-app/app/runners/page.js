"use client"
import CardList from "@/app/components/CardList/CardList";
import {endpoints} from "@/app/api/config";
import {useGetDataByCategory} from "@/app/api/api-hooks";
import {Preloader} from "@/app/components/Preloader/Preloader";



function runners() {
    const runnersGames = useGetDataByCategory(endpoints.games, "runner");
    return (
        <main className="main-inner">
            {runnersGames ? (
                <CardList id="runner" title="Ранеры" data={runnersGames} />
            ) : (
                <Preloader/>
            )}
        </main>
    );
}

export default runners;