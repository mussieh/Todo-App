/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            xl: { max: "1440px" },
            lg: { max: "1024px" },
            md: { max: "520px" },
            sm: { max: "425px" },
            xs: { max: "375px" },
        },
        extend: {
            colors: {
                brightBlue: "hsl(220, 98%, 61%)",
                skyBlue: "hsl(192, 100%, 67%)",
                mediumOrchid: "hsl(280, 87%, 65%)",

                // Light Theme
                lightVeryLightGray: "hsl(0, 0%, 98%)",
                lightVeryLightGrayishBlue: "hsl(236, 33%, 92%)",
                lightLightGrayishBlue: "hsl(233, 11%, 84%)",
                lightDarkGrayishBlue: "hsl(236, 9%, 61%)",
                lightVeryDarkGrayishBlue: "hsl(235, 19%, 35%)",

                // Dark Theme
                darkVeryDarkBlue: "hsl(235, 21%, 11%)",
                darkVeryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
                darkLightGrayishBlue: "hsl(234, 39%, 85%)",
                darkLightGrayishBlueHover: "hsl(236, 33%, 92%)",
                darkGrayishBlue: "hsl(234, 11%, 52%)",
                darkVeryDarkGrayishBlue: "hsl(233, 14%, 35%)",
                darkVeryDarkGrayishBlue2: "hsl(237, 14%, 26%)",
            },
            fontFamily: {
                sans: ["Josefin Sans", "sans-serif"],
            },
            backgroundImage: () => ({
                desktopLight: "url('./src/assets/images/bg-desktop-light.jpg')",
                desktopDark: "url('./src/assets/images/bg-desktop-dark.jpg')",
                mobileLight: "url('./src/assets/images/bg-mobile-light.jpg')",
                mobileDark: "url('./src/assets/images/bg-mobile-dark.jpg')",
            }),
        },
    },
    plugins: [
        plugin(function ({ addBase }) {
            addBase({
                html: { fontSize: "10px" },
            });
        }),
    ],
    darkMode: "selector",
};
