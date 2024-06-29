import React, { useState } from 'react';
import backgroundImage from "../images/bg.png"

import Header from './Header'
import Input from './Input'
import DataFromAPI from './DataFromAPI'
function Main() {
  const [selectedCity, setSelectedCity] = useState(null);
  return (
    
      <div className="flex  justify-center bg-gradient-to-r from-blue-950 to-blue-500" style={{ minHeight: '100vh' }}>
      <div className="w-full sm:w-3/6 h-144 custom-sm:mt-0 sm:mt-7 custom-sm:mx-0 sm:mx-16 filter drop-shadow-lg border custom-sm:border-transparent sm:border-white rounded-lg"
        style={{ backgroundImage: `url(${backgroundImage})`, height: '650px', width: "1100px" }}>
        <Header /> 
        <Input selectedCity={selectedCity} setSelectedCity={setSelectedCity}/>
        <DataFromAPI selectedCity={selectedCity} />
       
          
        
      </div>
     
    </div>
   
   
    

  )
}

export default Main