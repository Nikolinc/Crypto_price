import axios from "axios";
import {combine, createEffect, createEvent, createStore, sample} from "effector";
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


export const sherCoins = createEffect( {
  handler: async (query:string) => {
    const res =  await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
    console.log("map",res.data.coins)
    const coins = res.data.coins.map( (coin:coinArrayType)=> {
      console.log("coin",coin);

      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.coin_id,
        price: coin.item.price_btc,
      }})

    console.log("coins",coins);
    return coins;
  }
})
export const pageLoaded = createEvent();

export const $loading = combine([homeStore.pending, sherCoins.pending], ([с1, с2]) => с1 || с2)

sample({ clock: pageLoaded, target:[sherCoins, homeStore]})


sample({ clock: getQuery, target:[sherCoins]})


export const $coins = createStore<coinArrayType[]>([])
    .on(homeStore.doneData, (_, answer) =>
        answer)
    .on(sherCoins.doneData, (_, answer) =>
        answer)

