/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
          amigosred: "#dc3c2e",
          amigosyellow: "#e3cc4d",
          amigoswhite: "#fff6eb",
          amigosblack: "#140a02",
      }
    }
  },
  plugins: [],
}

