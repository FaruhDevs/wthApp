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
        "custom-2":"520px",
        "custom-3":"500px"
        
      },
      height: {
        'height-1': '4.25rem', // Custom width class
 
        
      },
    },
  },
  variants: {},
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
};
