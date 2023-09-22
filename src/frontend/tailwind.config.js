const tailwindcss = require('tailwindcss');
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            'sm': {'min': '640px', 'max': '767px'},
            'md': {'min': '768px', 'max': '1023px'},
            'lg': {'min': '1024px', 'max': '1279px'},
            'xl': {'min': '1280px', 'max': '1535px'},
            '2xl': {'min': '1536px'},
        }, extend: {
            'xxs': {'min': '1px', 'max': '367px'},
            'xs': {'min': '368px', 'max': '639px'},
        }
    },
    plugins: [],
}
