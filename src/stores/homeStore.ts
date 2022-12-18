import axios from "axios";
import {createEffect, createEvent, createStore} from "effector";
import coinType from "../type/storeType";
import coinArrayType from "../type/storeType";

export const stopLoadTickets = createEvent();
export const searchFailStop = createEvent();
export const $notStopSearch = createStore(true)
    .on(stopLoadTickets, () => false)
    .on(searchFailStop, () => false);

export const homeStore = createEffect({

  handler: async () => {
    const coin = [];
    const res =  await axios.get("https://api.coingecko.com/api/v3/search/trending");
    console.log(res);
    const coins = res.data.coins.map((coin: coinType) => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        price: coin.item.price_btc,
    }})

    coin.push(coins);
    return coin;
}});

export const $coins = createStore<coinArrayType[]>([])
    .on(homeStore.doneData, (_, answer) =>
        answer);


