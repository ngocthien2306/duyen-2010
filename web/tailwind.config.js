/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wine: { 50: '#fdf2f4', 100: '#fbe4e8', 200: '#f6c7d0', 300: '#ee9aab', 400: '#e2657f', 500: '#d13d5e', 600: '#b42647', 700: '#8f1c39', 800: '#6b1530', 900: '#4a0f22', 950: '#2a0713' },
        cream: '#fff8f3',
        gold: { 300: '#f3d9a4', 400: '#e8c27a', 500: '#d4a24c' },
      },
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
