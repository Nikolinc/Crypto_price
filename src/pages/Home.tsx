import React, { useEffect } from 'react'
import homeStore from '../stores/homeStore';

export default function Home(){
  const store = homeStore;
  useEffect(()=>{
   console.log(store);
  },[]);

  return(
    <div className="Home">Home</div>
  )
}

