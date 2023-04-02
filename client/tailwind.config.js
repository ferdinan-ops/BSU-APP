/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1170px'
      }
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        source: ['Source Sans Pro', 'sans-serif']
      },
      colors: {
        primary: '#FCB900',
        // primary: '#2d3e50',
        // primary: '#13A458',
        font: '#344054',
        'primary-hover': '#E1A500'
      },
      boxShadow: {
        button: '0px 10px 20px rgba(252, 185, 0, 0.25)'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#FCB900'
        }
      }
    ]
  }
}
