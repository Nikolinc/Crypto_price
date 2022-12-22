import axios from "axios";
import {createEffect, createEvent, createStore} from "effector";
import coinArrayType from "../type/storeType";


export const homeStore = createEffect({

  handler: async () => {

    const res =  await axios.get("https://api.coingecko.com/api/v3/search/trending");
    console.log(res);
    const coins = res.data.coins.map((coin: coinArrayType) => {
      return {
        name: coin.item.name,
        image: coin.item.small,
        id: coin.item.coin_id,
        price: coin.item.price_btc,
    }})

    return coins;
}});

homeStore.watch(params=>{
  console.log('эффект вызван с аргументом',params);
})

homeStore.done.watch(({result, params}) => {
  console.log('вызвов с аргументом', params)
  console.log('завершён со значением', result)
})

homeStore.fail.watch(({error, params}) => {
  console.log('вызов с аргументом', params)
  console.log('завершён с ошибкой', error)
})

export const $loading = homeStore.pending;

export const $coins = createStore<coinArrayType[]>([])
    .on(homeStore.doneData, (_, answer) =>
        answer)


