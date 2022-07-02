import React from "react";
import {
    BrowserRouter,
    Routes, // instead of "Switch", because "react-router-dom" is more than 6V
    Route
  } from "react-router-dom";

import Login from "./pages/Login";
import Books from "./pages/Books";
import NewBook from "./pages/NewBook";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route path="/books" element={<Books/>}/>
                <Route path="/book/new/:bookId" element={<NewBook/>}/>
            </Routes>
        </BrowserRouter>
    );
}

