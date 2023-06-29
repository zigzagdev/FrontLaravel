import React, {useState, useEffect} from "react";

function Change() {
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
        <div style={{
            color: theme === 'dark' ? '#fff' : '#000',
        }}>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
}
export default Change;