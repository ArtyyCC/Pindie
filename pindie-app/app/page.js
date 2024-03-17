"use client"
import Banner from "@/app/components/Banner/Banner";
import CardList from "@/app/components/CardList/CardList";
import {useGetDataByCategory} from "@/app/api/api-hooks";
import {endpoints} from "@/app/api/config";
import {Preloader} from "@/app/components/Preloader/Preloader";

function Home() {
    const popularGames = useGetDataByCategory(endpoints.games, "popular");
    const newGames = useGetDataByCategory(endpoints.games, "new");
    return (
        <main className="main">
            <Banner/>
            {popularGames ?
                (
                    <CardList data={popularGames} id="popular" title="Популярные"/>
                ) :
                (
                    <Preloader/>
                )
            }
            {newGames ?
                (
                    <CardList data={newGames} id="new" title="Новинки"/>
                ) :
                (
                    <Preloader/>
                )
            }

        </main>
    );
};

export default Home


// ⢛⣽⡟⠁⠄⠄⣀⡠⠔⠂⠈⠄⠄⠄⡀⠠⡀⠄⠄⠄⠄⠄⠄⠉⠉⠛⠿⢶⣦⣤⣄⣘⢦
// ⣾⠏⢀⣠⡶⠛⠁⠄⠄⠄⣰⠄⠄⣼⣷⡀⢻⣷⣤⡀⠄⢀⡀⠄⠄⠄⠄⠄⠈⠙⠻⣿⣿
// ⣯⣴⠟⠋⠄⠄⠄⢠⡎⢰⣿⡇⢰⣿⣿⣿⣜⣿⣿⣿⣄⠘⣿⣄⠄⠄⠄⠄⠄⠄⠄⠄⠙
// ⠟⠁⠄⠄⠄⠄⢠⣿⣇⣿⠿⢻⣸⣿⣿⣟⢉⡛⠻⠿⣿⣷⣿⣿⡆⣦⠄⠄⠄⠄⠄⠄⠄
// ⠄⠄⠄⠄⣠⡇⣾⣿⣭⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠄⠄⠄⠄⠄⠄
// ⠄⠄⠄⢀⣿⣷⠿⠿⠿⠿⢟⢻⣿⣿⣿⣿⣿⣿⣥⢒⣉⠭⠤⢉⡉⠛⠿⡆⠄⠄⠄⠄⠄
// ⠄⠄⠄⠘⠉⣀⣴⠖⠉⣡⠒⣿⣿⣿⣿⣿⣿⣿⣷⣿⠁⠄⠄⠆⠹⣦⠄⡄⠄⠄⠄⠄⠄
// ⠄⠄⠄⢰⡀⣿⡇⠄⠄⢀⠄⢸⣿⣿⣿⣿⣿⣿⣿⣿⣠⡄⠠⠄⢀⣏⣼⠁⠄⠄⠄⠄⠄
// ⠄⠄⠄⠈⣿⣾⣿⡴⠶⣁⡤⢸⣿⣿⣿⣿⣿⣿⣋⣉⣦⣝⣚⣃⣾⣿⠏⠄⠄⠄⠄⠄⠄
// ⠄⠄⠄⠄⠘⣿⣿⣿⣶⣾⣿⣿⣿⣏⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⣠⡎⠄⠄⠄⠄⠄
// ⠄⠄⠄⠄⢰⣜⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⠁⠄⠄⠄⠄⠄
// ⠄⠄⠄⠄⠄⢿⣿⣿⣿⣿⣿⣿⡛⠛⠉⠉⠉⠉⠉⣽⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄
// ⠄⠄⠄⠄⠄⠈⠻⣿⣿⣿⣿⣿⣧⠄⠄⠄⠄⠄⣴⣿⣿⣿⣿⣿⡿⠋⠄⠄⠄⠄⠄⠄⠄
// ⠄⠄⠄⠄⠄⠄⠄⠄⠉⠛⠿⣿⣿⣿⣶⣶⣶⣿⣿⣿⣿⠟⠋⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄
// ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠙⠛⠿⠿⠟⠋⠉⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄