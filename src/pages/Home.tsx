import React, {useEffect, useState} from 'react'
import {$coins, $loading, homeStore,} from '../stores/homeStore';
import {useUnit} from "effector-react";
import {Link} from "react-router-dom";



export default function Home(){

  const coins = useUnit($coins);
  const loading = useUnit($loading);

  useEffect(()=>{
    homeStore();

  },[]);


  if(loading){
    return (
        <div>loader ...</div>
    )
  }

  return(
    <div className="Home">
      {
        coins.map(coin => {

          return (
              <div key = {coin.id}>
                <Link to={`/${coin.id}`}>
                  {coin.name}
                </Link>
              </div>
          )
        })
      }
    </div>
  )
}

