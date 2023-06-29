import React, {useEffect, useState} from 'react';
import Change from "./Darkmode";

export default function Header() {
    return (
        <>
            <div className="py-12 px-24">
                <a href="/" className="decoration-neutral-50">
                    <strong>Whisky love</strong>
                </a>
                <Change/>
            </div>
        </>
    )
}