import axios from "axios";
import {createEffect, createEvent, createStore, sample} from "effector";
import coinArrayType from "../type/storeType";


export const homeStore = createEffect({

  handler: async () => {

    const res =  await axios.get("https://api.coingecko.com/api/v3/search/trending");
    const coins = res.data.coins.map((coin: coinArrayType) => {
      return {
        name: coin.item.name,
        image: coin.item.small,
        id: coin.item.coin_id,
        price: coin.item.price_btc,
    }})

    return coins;
}});

export const getQuery = createEvent<string>("");
const $query = createStore<string>("")
    .on(getQuery,(state, msg)=> msg);


export const sherCoins = createEffect({
  handler: async () => {
    const res =  await axios.get(`https://api.coingecko.com/api/v3/search?query=${$query}`);
    const coins = res.data.coins.map((coin: coinArrayType) => {
      return {
        name: coin.item.name,
        image: coin.item.small,
        id: coin.item.coin_id,
        price: coin.item.price_btc,
      }})
   console.log($query);
    console.log(coins);
    return coins;
  }
})

sample({ clock: getQuery, target:[sherCoins]})
export const $loading = homeStore.pending && sherCoins.pending;

export const $coins = createStore<coinArrayType[]>([])
    .on(homeStore.doneData, (_, answer) =>
        answer)
    .on(sherCoins.doneData, (_, answer) =>
        answer)

