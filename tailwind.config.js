module.exports = {
  theme: {
    extend: {
      screens: {
        'custom-sm': '460px',
      },
      colors: {
        'blue-950': '#001f3f', // Replace with your desired hex code
      },
      fontSize: {
        'xxs': '0.625rem', // This is 10px
      },
      width: {
        'custom-1': '9.2rem', // Custom width class
        
      },
    },
  },
  variants: {},
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
};
