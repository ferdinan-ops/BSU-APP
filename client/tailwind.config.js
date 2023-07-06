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
        // primary: '#2563eb',
        primary: '#4f46e5',
        font: '#344054',
        // 'primary-hover': '#1e40af'
        'primary-hover': '#3730a3'
      },
      boxShadow: {
        // button: '0px 10px 20px rgba(59, 130, 246, 0.25)',
        button: '0px 10px 20px rgba(79, 70, 229, 0.25)',
        card: '0px 0px 10px #2e385614',
        'white-btn': '0px 10px 20px rgba(255, 255, 255, 0.25)'
      }
    }
  }
}
