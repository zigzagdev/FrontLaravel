import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {Items} from "./app/post/Items";
import {TopPage} from "./TopPage";
import Instagram from "./common/footer/Instagram";
import NotFound from "./app/exception/NotFound";
import Contact from "./common/footer/Contact";
import {AdminLogin} from "./app/auth/AdminLogin";
import {UserLogin} from "./app/auth/UserLogin";
import {Result} from "./app/input/Result";
import {ItemDisplay} from "./app/post/ItemSlug";
import {AdminData, AllUsers, CreateAdmin, EditAdminEmail, EditAdminName} from "./app/admin/Profile";
import {CreateUser, EachData,EditEmail, EditName} from "./app/user/User";
import {ForgetPassword, ResetPassword} from "./app/auth/PasswordReset";
import {ShowSlug, EditSlug} from "./app/admin/Item"


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
                <Route path="/Item/:slug" element={<ItemDisplay/>}/>
                <Route path="/Result" element={<Result/>}/>
                <Route path="/Signup" element={<CreateUser/>}/>
                <Route path="/Admin/Create" element={<CreateAdmin/>}/>
                <Route path="/Forget/Password" element={<ForgetPassword/>}/>
                <Route path="/Reset/Password" element={<ResetPassword/>}/>
                <Route path="*" element={<NotFound/>}/>
                {/*AdminProvider*/}
                <Route path="/Admin/:id/Profile" element={<AdminData/>}/>
                <Route path="/Admin/:id/Item/:slug" element={<ShowSlug/>}/>
                <Route path="/Item/Edit/:slug" element={<EditSlug/>}/>
                <Route path="Admin/:id/Update/Email" element={<EditAdminEmail/>}/>
                <Route path="Admin/:id/Update/Name" element={<EditAdminName/>}/>
                <Route path="Admin/:id/Users" element={<AllUsers/>}/>
                {/*UserProvider*/}
                <Route path="User/:id" element={<EachData/>}/>
                <Route path="User/:id/Name" element={<EditName/>}/>
                <Route path="User/:id/Email" element={<EditEmail/>}/>
            </Routes>
        </BrowserRouter>
    )
}
