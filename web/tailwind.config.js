/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wine: { 50: '#fff1f6', 100: '#ffe3ee', 200: '#ffc8dd', 300: '#ff9ec2', 400: '#fb6fa3', 500: '#f0468a', 600: '#d92671', 700: '#b4185d', 800: '#93154f', 900: '#7a1446', 950: '#460624' },
        cream: '#fff7fa',
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
