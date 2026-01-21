/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx,jsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,ts,tsx,jsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
