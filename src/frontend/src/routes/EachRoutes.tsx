import React from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Test from "../components/app/Test";
import Index from "../components/Index";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";


export default function EachRoutes() {
    return(
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index/>} />
                        <Route path="/Header" element={<Header/>} />
                        <Route path="/Footer" element={<Footer/>} />
                        <Route path="/Test" element={<Test/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}