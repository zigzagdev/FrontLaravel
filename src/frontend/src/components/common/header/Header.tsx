import React from 'react';
import Darkmode from "./Darkmode";

export default function Header() {
    return (
        <>
            <div className="py-12 px-24 flex justify-between">
                <a href="/" className="decoration-neutral-50">
                    <strong>Whisky love</strong>
                </a>
                <Darkmode/>
            </div>
        </>
    )
}