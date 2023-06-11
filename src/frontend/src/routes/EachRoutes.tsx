import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import Posts from "../components/app/post/Posts";
import Index from "../components/Index";
import Instagram from "../components/common/footer/Instagram";
import Slug from "../components/app/post/Slug";
import NotFound from "../components/app/exception/NotFound";


export default function EachRoutes() {
    return(
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index/>} />
                        <Route path="/Header" element={<Header/>} />
                        <Route path="/Footer" element={<Footer/>} />
                        <Route path="/Posts" element={<Posts/>} />
                        <Route path="/Instagram" element={<Instagram/>} />
                        <Route path="/Posts" element={<Posts/>} />
                        <Route path="/Posts/:slug" element={<Slug/>} />
                        <Route path="/error" element={<NotFound/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}