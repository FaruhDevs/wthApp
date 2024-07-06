module.exports = {
  theme: {
    extend: {
      screens: {
        'custom-sm': '460px',
        "custom-xsm":"360px",
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
        "custom-3":"500px",
        "17":"4.25rem"
        
      },
      height: {
        'height-1': '4.25rem', // Custom width class
 
        
      },
      gap: {
        '17': '4.25rem', // Define the custom gap value here
      },
    },
  },
  variants: {},
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
};
