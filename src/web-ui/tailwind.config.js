/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./app.vue",
        "./plugins/**/*.{js,ts}",
    ],
    theme: {
        extend: {
            animation: {},
            keyframes: {},
            transitionProperty: {},
        },
        colors: {
            gray: "#272A2C",
            // gray: "#4F4F4F",
            white: "#FFFFFF",
            primary: "#0F6C7E",
            secondary: "#1196B1",
        },
        borderRadius: {
            full: "100%",
            lg: "20px",
            md: "10px",
        },
    },
    plugins: [],
};
