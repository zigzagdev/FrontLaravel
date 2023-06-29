import React, {useEffect, useState} from 'react';
import Change from "./Darkmode";

export default function Header() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme == 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
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