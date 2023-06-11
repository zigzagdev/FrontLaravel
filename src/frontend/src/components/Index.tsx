import React from "react";
import Header from "./common/header/Header";
import Footer from "./common/footer/Footer";

export default function Index() {
    return (
        <>
            <Header/>
            <div className="my-3 block text-sm text-gray-300 duration-700 hover:text-gray-100">
                Top Page
            </div>
            <Footer/>
        </>
    )
}