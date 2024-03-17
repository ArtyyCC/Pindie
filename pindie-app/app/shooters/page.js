"use client"
import CardList from "@/app/components/CardList/CardList";
import {useGetDataByCategory} from "@/app/api/api-hooks";
import {endpoints} from "@/app/api/config";
import {Preloader} from "@/app/components/Preloader/Preloader";


function shooters() {
    const shootersGames = useGetDataByCategory(endpoints.games, "shooter");
    return (
        <main className="main-inner">
            {shootersGames ? (
                <CardList id="shooter" title="Шутеры" data={shootersGames} />
            ) : (
                <Preloader/>
            )}
        </main>
    );
}

// const shooters = () => {
//     const shootersGames = getGamesByCategory("shooter");
//     return (
//         <main>
//             <CardList data={shootersGames} id="shooter" title="Шутеры"/>
//         </main>
//     );
// };

export default shooters;