module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    minHeight: {
      0: '0px',
      200: '200px',
      full: '100%',
      screen: '100vh',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
