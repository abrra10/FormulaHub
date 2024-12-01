/** @type {import('tailwindcss').Config} */
export default {
  server: {
    proxy: {
      "/api": {
        target: "https://ergast.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove `/api` prefix before sending request
      },
    },
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090b", // Fourth color
        primary: "#eeeeee", // First color
        accent: "#ff7100", // Second color
        secondary: "#be3030", // Third color
      },
      fontFamily: {
        bowlby: ['"Bowlby One"', "sans-serif"],
        anton: ['"Anton"', "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
