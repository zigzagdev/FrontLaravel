import React from 'react';
import Darkmode from "./Darkmode";

export default function AdminHeader() {
    return (
        <>
            <div className="py-12 px-24 flex justify-between">
                <a href="/" className="decoration-neutral-50">
                    <strong>Admin Page</strong>
                </a>
                <Darkmode/>
            </div>
        </>
    )
}