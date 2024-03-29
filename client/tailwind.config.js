/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-img-main': "url('/img/bg.jpg')"
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
         addVariant('child', '& > *');
         addVariant('child-hover', '& > *:hover');
    //     addVariant('child-inputs', '& > input');
    //     addVariant('child-inputs-hover', '& > input:hover');

    },
],
  darkMode: 'class',
}
