import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {Items} from "../components/app/post/Items";
import {TopPage} from "../components/TopPage";
import Instagram from "../components/common/footer/Instagram";
import NotFound from "../components/app/exception/NotFound";
import Contact from "../components/common/footer/Contact";
import {AdminLogin} from "../components/app/auth/AdminLogin";
import {UserLogin} from "../components/app/auth/UserLogin";
import {Result} from "../components/app/input/Result";
import {ShowSlug, EditSlug} from "../components/app/post/ItemSlug";
import {AdminData, AllUsers, CreateAdmin, EditAdminEmail, EditAdminName} from "../components/app/admin/Admin";
import {CreateUser, EachUserData, EditUserEmail, EditUserName} from "../components/app/user/Info";
import {ForgetPassword, ResetPassword} from "../components/app/auth/PasswordReset";


export default function EachRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Admin/Login" element={<AdminLogin/>}/>
                <Route path="/Login" element={<UserLogin/>}/>
                <Route path="/" element={<TopPage/>}/>
                <Route path="/Instagram" element={<Instagram/>}/>
                <Route path="/Contact" element={<Contact/>}/>
                <Route path="/Items" element={<Items/>}/>
                <Route path="/Result" element={<Result/>}/>
                <Route path="/Signup" element={<CreateUser/>}/>
                <Route path="/Admin/Create" element={<CreateAdmin/>}/>
                <Route path="/Forget/Password" element={<ForgetPassword/>}/>
                <Route path="/Reset/Password" element={<ResetPassword/>}/>
                <Route path="*" element={<NotFound/>}/>
                //AdminProvider
                <Route path="/Admin/:id/Profile" element={<AdminData/>}/>
                <Route path=":id/Item/:slug" element={<ShowSlug/>}/>
                <Route path="/Post/:slug/Edit" element={<EditSlug/>}/>
                <Route path="Admin/Update/Email" element={<EditAdminName/>}/>
                <Route path="Admin/Update/Name" element={<EditAdminEmail/>}/>
                <Route path="Admin/:id/Users" element={<AllUsers/>}/>
                // UserProvider
                <Route path="User/:id" element={<EachUserData/>}/>
                <Route path="User/:id/Name" element={<EditUserName/>}/>
                <Route path="User/:id/Email" element={<EditUserEmail/>}/>
            </Routes>
        </BrowserRouter>
    )
}
