"use client"
import Banner from "@/app/components/Banner/Banner";
import CardList from "@/app/components/CardListSection/CardList";
import {useGetDataByCategory} from "@/app/api/api-hooks";
import {endpoints} from "@/app/api/config";
import {Preloader} from "@/app/components/Preloader/Preloader";
import {CardsListSection} from "@/app/components/CardListSection/CardsListSection";

function Home() {
    const popularGames = useGetDataByCategory(endpoints.games, "popular");
    const newGames = useGetDataByCategory(endpoints.games, "new");
    return (
        <main className="main">
            <Banner/>
            {popularGames ?
                (
                    <CardsListSection type="slider" id="popular" title="Популярные" data={popularGames} />
                ) :
                (
                    <Preloader/>
                )
            }
            {newGames ?
                (
                    <CardsListSection type="slider" id="new" title="Новинки" data={newGames} />
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