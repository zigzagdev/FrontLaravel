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
import PostSlug from "../components/app/post/PostSlug";
import NotFound from "../components/app/exception/NotFound";
import Contact from "../components/common/footer/Contact";


export default function EachRoutes() {
    return (
        <>
            <Header/>
            <div>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Index/>}/>
                        <Route path="/Header" element={<Header/>}/>
                        <Route path="/Footer" element={<Footer/>}/>
                        <Route path="/Posts" element={<Posts/>}/>
                        <Route path="/Instagram" element={<Instagram/>}/>
                        <Route path="/Posts" element={<Posts/>}/>
                        <Route path="/Posts/:slug" element={<PostSlug/>}/>
                        <Route path="/404" element={<NotFound/>}/>
                        <Route path="/Contact" element={<Contact/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </div>
        </>
    )
}