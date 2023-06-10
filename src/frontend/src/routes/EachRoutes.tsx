import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import Test from "../components/app/Test";
import Index from "../components/Index";
import Instagram from "../components/common/footer/Instagram";



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
                        <Route path="/Instagram" element={<Instagram/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}