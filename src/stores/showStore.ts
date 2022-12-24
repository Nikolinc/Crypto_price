import {createEffect} from "effector/effector.umd";
import {combine, createEvent, createStore, hydrate, sample} from "effector";
import axios from "axios";
import {infoType} from "../type/storeType";



export const graphEffect = createEffect({
        handler:async (id:any)=>{
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=max`);

        const graphs = res.data.prices.map((graph:any)=>
        {  const [timestamp, price] = graph;
            return {
                Date: new Date(timestamp).toLocaleString("ru"),
                Price:price
            }
        })

        return graphs
        }
});

export const graphEvent = createEvent<any>()



export const $grah = createStore<any[]>([])
    .on(graphEffect.doneData, (_: any, answer: any) =>
        answer)


export const infoCoinsEffect = createEffect({
    handler:async (id:any)=>{
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`);
        console.log(res.data);
        const infoCroin:infoType =
        {

               name:res.data.name,
               symbol: res.data.symbol,
               description:res.data.description.en,
               links:res.data.links.homepage,
               image:res.data.image.small,

        }

        return infoCroin
    }
});
export const $infoCoins = createStore<infoType>(
    {  name: "",
    symbol: "",
    description:"",
    links:"",
    image:"",})
    .on(infoCoinsEffect.doneData, (_: any, answer: any) =>
        answer)

export const priceCoinEffect =createEffect({
    handler:async (id:any)=>{
        const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);
        const price =   res.data[id].usd;
        console.log('price',price);
        return price
    }
});
export const $priceCoin = createStore<number>(1)
    .on(priceCoinEffect.doneData, (_, answer) =>
        answer);


export const InfoLoaded = createEvent<any>();
export const $infoLoading = combine([graphEffect.pending, infoCoinsEffect.pending], ([с1, с2]) => с1 || с2)

sample({ clock: InfoLoaded, target:[graphEffect,infoCoinsEffect,graphEvent,priceCoinEffect]})
