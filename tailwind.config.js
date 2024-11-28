/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                digital: ["Digital Numbers Regular"],
                mono: ["Monofonto Regular"],
            },
            fontSize: {
                clamp: "clamp(1rem, 6vw, 4rem)",
                clampTimer: "clamp(1rem, 20vw, 8rem)",
                clampButton: "clamp(0.2rem, 3vw, 1rem)",
                clampText: "clamp(0.5rem, 5vw, 2.5rem)",
                clampScore: "clamp(1rem, 15vw, 12rem)",
                clampScoreboard: "clamp(1rem, 15vw, 8rem)",
                clampTimerScoreboard: "clamp(1rem, 15vw, 14rem)",
            },
            colors: {
                deepBlue: "#130a5c",
                toxicGreen: "#51ed10",
                toxicRed: "#fb2008",
            },
        },
    },
    plugins: [],
};
