import React, { useState } from 'react';
import backgroundImage from "../images/bg.png"

import Header from './Header'
import Input from './Input'
import DataFromAPI from './DataFromAPI'
function Main() {
  const [selectedCity, setSelectedCity] = useState(null);
  return (
    
    <div className="flex justify-center bg-gradient-to-r from-blue-950 to-blue-500" style={{ minHeight: '100vh' }}>
    <div

      className="
        w-full sm:w-7/12 custom-sm:mt-0 sm:mt-7 custom-sm:mx-0 sm:mx-16
        filter drop-shadow-lg border  custom-sm:border-transparent sm:border-white/20 
        rounded-lg h-[1170px] sm:h-[650px]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header />
      <Input selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      
      <DataFromAPI selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
    </div>
  </div>
  
   
   
    

  )
}

export default Main