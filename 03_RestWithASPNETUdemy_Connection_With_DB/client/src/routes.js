import React from "react";
import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
  } from "react-router-dom";

import Login from "./pages/Login";
import Book from "./pages/Book";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route path="/book" element={<Book/>}/>
            </Routes>
        </BrowserRouter>
    );
}

