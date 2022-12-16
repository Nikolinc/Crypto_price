import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Show from '../pages/Show'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element = {<Home/>}/>
        <Route path = '/:id' element ={<Show/>}/>
      </Routes>
  </BrowserRouter>
  )
}
