/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
    "./headers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111',
        secondary: '#161622',
        danger: '#dc002c',
        info: '#0088ff',
        success: '#0bb90b',
        grey: {
          DEFAULT: '#60606b',
          100: '#212131'
        }
      }
    },
  },
  plugins: [],
}