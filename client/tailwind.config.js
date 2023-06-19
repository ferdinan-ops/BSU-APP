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
        // primary: '#5429FF',
        primary: '#2563eb',
        // primary: '#22c55e',
        // font: '#344054',
        font: '#080027',
        'primary-hover': '#1e40af'
      },
      boxShadow: {
        button: '0px 10px 20px rgba(59, 130, 246, 0.25)',
        card: '0px 0px 20px #2e385614',
        box: '5px 5px 0px #000',
        'white-btn': '0px 10px 20px rgba(255, 255, 255, 0.25)'
      }
    }
  }
}
