/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "orange-dark": "#FEAF00",
        "orange-light": "#F8D442",
        "light-gray": "#F2EAE1",
        "light-blue": "#F0F9FF",
        "light-yellow": "#FEFBEC",
        "light-purple": "#FEF6FB",
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        mulish: ['Mulish', 'sans-serif'],
      },
      minHeight: {
        "100dvh": "100dvh"
      },
      height: {
        "100dvh": "100dvh"
      },
      boxShadow: {
        "form": "2px 5px 10px 0px #0000001A"
      },
      screens: {
        "1/2xl": "1369px"
      }
    },
  },
  plugins: [],
}
