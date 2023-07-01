import React, {useState, useEffect} from "react";
import './Darkmode.css'

function Darkmode() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    return (
        <div className={theme}>
            <button onClick={toggleTheme}>
                {theme === 'dark' ? "🌙" : "🌞"}
            </button>
        </div>
    );
}

export default Darkmode;