/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dc2626',
        secondary: '#6c757d',
        accent: '#f59e0b',
      },
      fontFamily: {
          sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

