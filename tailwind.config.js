/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        italianno: ['Italianno', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins','sans-serif'],
      },
      colors: {
        primary: '#FFFFFF',
        secondary: '#C10C99',
        tertiary: '#B5B5B5',
        quaternary: '#CD46D9',
        component: '#505350',
        gradientEnd: '#27C5C9',
        bg: '#2F3133',
      },
      fontSize: {
        'tiny': '13px',
      },
      borderRadius: {
        'custom': '20px',
      },
      backgroundColor: {
        lightgray: '#D3D3D3',
      },
      backgroundSize: {
        'custom': '105.332% 612.786%',
      },
      backgroundPosition: {
        'custom': '-14px -659.134px',
      },
      screens: {
        '3xl': '1920px',
    },
    },
  },
  plugins: [
  ],
}

