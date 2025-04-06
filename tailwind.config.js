const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [lineClamp],
};
