import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import {Posts} from "../components/app/post/Posts";
import {TopPage} from "../components/TopPage";
import Instagram from "../components/common/footer/Instagram";
import NotFound from "../components/app/exception/NotFound";
import Contact from "../components/common/footer/Contact";
import Login from "../components/app/auth/Login";
import UserIndex from "../components/app/user/Info";
import Result from "../components/app/input/Result";
import {ShowSlug, EditSlug, DeleteSlug} from "../components/app/post/PostSlug";
import {UpdateEmail, AdminData} from "../components/app/admin/Admin";


export default function EachRoutes() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<TopPage/>}/>
                        <Route path="/Posts" element={<Posts/>}/>
                        <Route path="/Instagram" element={<Instagram/>}/>
                        <Route path="/Post/:slug" element={<ShowSlug/>}/>
                        <Route path="/Post/:slug/Edit" element={<EditSlug/>}/>
                        <Route path="/Post/:slug" element={<DeleteSlug/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="/Contact" element={<Contact/>}/>
                        <Route path="/Login" element={<Login/>}/>
                        <Route path="/UserIndex" element={<UserIndex/>}/>
                        <Route path="/Result" element={<Result/>}/>
                        <Route path="/Admin/Email/Update" element={<UpdateEmail/>}/>
                        <Route path="/Admin" element={<AdminData/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </div>
        </>
    )
}