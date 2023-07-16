import React from "react";
import image from "../../../404_error.jpeg";

export default function NotFound() {
    return (
        <>
            <div className="py-12 px-24">
                <div className="py-12 align-items-center">
                    <img src={image} alt='Not found here anything .'/>
                </div>
            </div>
        </>
    )
}






