import React, {useEffect, useState} from 'react'
import {$coins, $loading, $price, getQuery, homeStore, pageLoaded, sherCoins,} from '../stores/homeStore';
import {useUnit} from "effector-react";
import {Link} from "react-router-dom";
import Loading from "../component/loading";



export default function Home(){

  const [text, setText] = useState("");
  const coins = useUnit($coins);
  const price = useUnit($price);
  const loading = useUnit($loading);
  const onEnter = (event:any) => event.key === 'Enter' && getQuery(text);

  useEffect(()=>{
      pageLoaded();
  },[]);


  if(loading || coins.length === 0){
    return (
        <Loading/>
    )
  }

  return(
    <div className=" grid grid-cols-1 gap-4 place-items-center">

      <label

          htmlFor="UserEmail"
          className="my-8 w-1/2 flex justify-center relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
      >
        <input
            type="text"
            id="UserEmail"
            value={text}
            onChange={e=>setText(e.target.value)}
            onKeyPress={e => onEnter(e)}
            placeholder="Email"
            className=" peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />

        <span
            className=" flex justify-center absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
        >
    Coins
  </span>
      </label>

      <div className="overflow-x-auto w-2/5" >
        <table className="min-w-full divide-y divide-gray-200 text-sm">


          <tbody className="divide-y divide-gray-200">
      {
        coins.map(coin => {


          return (



                <tr key={coin.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    <a href="#" className="block shrink-0">
                      <span className="sr-only">Profile</span>
                      <img
                          alt="logo"
                          src={coin.image}
                          className="h-10 w-10 rounded-full object-covesr"
                      />
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <Link to={`/${coin.id}`}>
                     {coin.name}
                     </Link></td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex flex-col justify-end">

                        <h5 className="text-xl font-bold">
                          { coin.price_btc}BTC
                      </h5>


                      <p className="mt-0.5 text-sm">${(coin.price_btc * price).toFixed(2)
                      }USD</p>
                  </td>
                </tr>





          )
        })
      }
           </tbody>
        </table>
      </div>

    </div>
  )
}

