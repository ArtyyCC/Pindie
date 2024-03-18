"use client"
import {endpoints} from "@/app/api/config";
import {useGetDataByCategory} from "@/app/api/api-hooks";
import {Preloader} from "@/app/components/Preloader/Preloader";
import {CardsListSection} from "@/app/components/CardListSection/CardsListSection";


function popular() {
    const popularGames = useGetDataByCategory(endpoints.games, "popular");
    return (
        <main className="main-inner">
            {popularGames ? (
                <CardsListSection id="popular" title="Популярные" data={popularGames} />
            ) : (
                <Preloader/>
            )}
        </main>
    );
}


export default popular;