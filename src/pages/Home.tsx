import React, {useEffect, useState} from 'react'
import {$coins, homeStore,} from '../stores/homeStore';
import {useUnit} from "effector-react";
import {Link} from "react-router-dom";



export default function Home(){

  const coins = useUnit($coins);

  useEffect(()=>{
    homeStore();
  },[]);



  return(
    <div className="Home">
      {
        coins.map(coin => {
          console.log(coin)
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

