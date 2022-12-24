
export default interface coinType{
    market_cap_rank: number;
    coin_id: any;
    image: any;
     item: {
         id: any;
         small: string;
         name: string;
         large: string;
         coin_id: number;
         price_btc: number;
     };
}



export default interface coinArrayType{
    name: string;
    large: string;
    id: any;
    price_btc: number;
}


export enum currency{
    usd = 'usd',
    rub = "rub"
}

export  type currencyType = currency.rub | currency.usd;

export interface infoType{
    name: string,
    symbol: string,
    description:string,
    links:string,
    image:string,
}