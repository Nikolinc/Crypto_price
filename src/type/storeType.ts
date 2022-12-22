
export default interface coinType{
    image: any;
     item: {
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
    id: number;
    price_btc: number;
}