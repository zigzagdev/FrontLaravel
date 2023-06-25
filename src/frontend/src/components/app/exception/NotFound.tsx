import React from "react";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import image from "../../../404_error.jpeg";

export default function NotFound() {
    return(
        <>
            <Header/>
            <div className="py-12 px-24">
                <div className="py-12 align-items-center">
                    <img src={image} alt='Not found here anything .'/>
                </div>
            </div>
            <Footer/>
        </>
    )
}