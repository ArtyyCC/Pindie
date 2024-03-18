"use client"
import {useGetDataByCategory} from "@/app/api/api-hooks";
import {endpoints} from "@/app/api/config";
import {Preloader} from "@/app/components/Preloader/Preloader";
import {CardsListSection} from "@/app/components/CardListSection/CardsListSection";


function tds() {
    const tdsGames = useGetDataByCategory(endpoints.games, "TDS");
    return (
        <main className="main-inner">
            {tdsGames ? (
                <CardsListSection id="TDS" title="TDS" data={tdsGames} />
            ) : (
                <Preloader/>
            )}
        </main>
    );
}


export default tds;