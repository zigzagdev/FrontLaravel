import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {Posts} from "../components/app/post/Posts";
import {TopPage} from "../components/TopPage";
import Instagram from "../components/common/footer/Instagram";
import NotFound from "../components/app/exception/NotFound";
import Contact from "../components/common/footer/Contact";
import {AdminLogin} from "../components/app/auth/AdminLogin";
import {UserLogin} from "../components/app/auth/UserLogin";
import Result from "../components/app/input/Result";
import {ShowSlug, EditSlug} from "../components/app/post/PostSlug";
import {AdminData, AllUsers, EditAdminEmail, EditAdminName} from "../components/app/admin/Admin";
import {EachUserData, EditUserEmail, EditUserName} from "../components/app/user/Info";


export default function EachRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Admin/Login" element={<AdminLogin/>}/>
                <Route path="/Login" element={<UserLogin/>}/>
                <Route path="/" element={<TopPage/>}/>
                <Route path="/Instagram" element={<Instagram/>}/>
                <Route path="/Contact" element={<Contact/>}/>
                <Route path="/Posts" element={<Posts/>}/>
                <Route path="/Result" element={<Result/>}/>
                <Route path="*" element={<NotFound/>}/>
                //AdminProvider
                <Route path="/Admin/:id/Profile" element={<AdminData/>}/>
                <Route path="/Post/:slug" element={<ShowSlug/>}/>
                <Route path="/Post/:slug/Edit" element={<EditSlug/>}/>
                <Route path="Admin/Update/Email" element={<EditAdminName/>}/>
                <Route path="Admin/Update/Name" element={<EditAdminEmail/>}/>
                <Route path="Admin/Users" element={<AllUsers/>}/>
                // UserProvider
                <Route path="User/:id" element={<EachUserData/>}/>
                <Route path="User/:id/Name" element={<EditUserName/>}/>
                <Route path="User/:id/Email" element={<EditUserEmail/>}/>
            </Routes>
        </BrowserRouter>
    )
}