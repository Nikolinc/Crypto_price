import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Show from "../pages/Show";
import Header from "../component/header";
import Footer from "../component/footers";

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:id" element={<Show />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}
