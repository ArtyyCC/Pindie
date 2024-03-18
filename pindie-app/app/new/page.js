'use client';
import { useGetDataByCategory } from '@/app/api/api-hooks'
import {endpoints} from "@/app/api/config";
import {Preloader} from "@/app/components/Preloader/Preloader";
import {CardsListSection} from "@/app/components/CardListSection/CardsListSection";


function New() {
    const newGames = useGetDataByCategory(endpoints.games, "new");
    return (
        <main className="main-inner">
            {newGames ? (
                <CardsListSection id="new" title="Новые" data={newGames} />
            ) : (
                <Preloader/>
            )}
        </main>
    );
}

export default New;

