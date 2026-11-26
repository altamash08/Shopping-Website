/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: '#E8EBF3',
        mist: '#F4F6FB',
        ink: '#171B2E',
        steel: '#596082',
        hair: 'rgba(23, 27, 46, 0.12)',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        logo: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Unbounded', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        float: '0 40px 80px -40px rgba(44, 52, 110, 0.55)',
        soft: '0 16px 36px -24px rgba(44, 52, 110, 0.45)',
      },
    },
  },
  plugins: [],
}
