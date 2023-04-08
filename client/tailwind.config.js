/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        // lg: '1240px',
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
        primary: '#5429FF',
        font: '#344054',
        'primary-hover': '#3b18c7'
      },
      boxShadow: {
        button: '0px 10px 20px rgba(84, 41, 255, 0.25)',
        'white-btn': '0px 10px 20px rgba(255, 255, 255, 0.25)'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#5429FF'
        }
      }
    ]
  }
}
