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
        id: coin.item.id,
        price_btc: coin.item.price_btc.toFixed(10)
      }})
    console.log("coins",coins)
    return coins;
}});

export const getQuery = createEvent<string>("");


const $query = createStore<string>("")
    .on(getQuery,(state, msg)=> msg);


export const sherCoins = createEffect( {
  handler: async (query:string) => {
    const res =  await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);

    const coins:coinArrayType[] =[];
    res.data.coins.forEach((coin:coinArrayType) => {

      coins.push({
        market_cap_rank: 0,
        item: {coin_id: 0, large: "", name: "", price_btc: 0, small: "",id: ""},
        large: "",
        name: coin.name,
        coin_id: undefined,
        image: coin.large,
        id: coin.id,
        price_btc: coin.market_cap_rank
      });
    });

    console.log(coins);
    return coins;
  }
})
export const pageLoaded = createEvent();

export const priceEffect =createEffect({
  handler:async ()=>{
    const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`);
    const price = res.data.bitcoin.usd;
    return price
  }
});
export const $price = createStore<number>(1)
    .on(priceEffect.doneData, (_, answer) =>
        answer);

export const $loading = combine([homeStore.pending, sherCoins.pending], ([с1, с2]) => с1 || с2)

sample({ clock: pageLoaded, target:[sherCoins, homeStore,priceEffect]})


sample({ clock: getQuery, target:[sherCoins]})


export const $coins = createStore<coinArrayType[]>([])
    .on(homeStore.doneData, (_, answer) =>
        answer)
    .on(sherCoins.doneData, (_, answer) =>
        answer)

