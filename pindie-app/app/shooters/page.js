"use client"
import {useGetDataByCategory} from "@/app/api/api-hooks";
import {endpoints} from "@/app/api/config";
import {Preloader} from "@/app/components/Preloader/Preloader";
import {CardsListSection} from "@/app/components/CardListSection/CardsListSection";


function shooters() {
    const shootersGames = useGetDataByCategory(endpoints.games, "shooter");
    return (
        <main className="main-inner">
            {shootersGames ? (
                <CardsListSection id="shooter" title="Шутеры" data={shootersGames} />
            ) : (
                <Preloader/>
            )}
        </main>
    );
}


export default shooters;