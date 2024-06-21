module.exports = {
  theme: {
    extend: {
      screens: {
        'custom-sm': '460px',
      },
      colors: {
        'blue-950': '#001f3f', // Replace with your desired hex code
      },
    },
  },
  variants: {},
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
};
