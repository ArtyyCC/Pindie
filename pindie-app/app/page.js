"use client"
import {getGamesByCategory} from './data/data-utils';
import Banner from "@/app/components/Banner/Banner";
import Promo from "@/app/components/Promo/Promo";
import CardList from "@/app/components/CardList/CardList";
import {useEffect} from "react";

export default async function Home() {
    const popularGames = getGamesByCategory("popular")
    const newGames = getGamesByCategory('new')
    return (
      <main className="main">
        <Banner/>
          <CardList data={popularGames} id="popular" title="Популярные"/>
          <CardList data={newGames} id="new" title="Новинки"/>
        <Promo/>
      </main>
  )
}

// useEffect(() => {
//     const getData = async (url) => {
//         try {
//             const response = await fetch(url);
//             if (response.status !== 200) {
//                 throw new Error("Ошибка получения данных");
//             }
//             const data = await response.json();
//             console.log(data);
//             return data;
//         } catch (error) {
//             return error;
//         }
//     };
//     getData("https://api-code-2.practicum-team.ru/games");
// }, []);
