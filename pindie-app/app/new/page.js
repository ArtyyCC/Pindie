'use client';
import { useGetDataByCategory } from '@/app/api/api-hooks'
import CardList from "@/app/components/CardList/CardList";
import {endpoints} from "@/app/api/config";
import {Preloader} from "@/app/components/Preloader/Preloader";


function New() {
    const newGames = useGetDataByCategory(endpoints.games, "new");
    return (
        <main className="main-inner">
            {newGames ? (
                <CardList id="new" title="Новые" data={newGames} />
            ) : (
                <Preloader/>
            )}
        </main>
    );
}

export default New;

