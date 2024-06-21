import React from 'react'
import backgroundImage from "../assets/bg.png"
import Header from './Header'
function Main() {
  return (
    <div className="flex  justify-center h-screen bg-gradient-to-r from-blue-950 to-blue-500">
      <div className="w-full  w-10/12 h-3/4  custom-sm:mt-0  sm:mt-7 
        custom-sm:mx-0  sm:mx-16 filter drop-shadow-lg
           border custom-sm:border-transparent  sm:border-white rounded-lg  "
         style={{backgroundImage: `url(${backgroundImage})`,}}>
        <Header/>
      </div>
      
    </div>
    
  )
}

export default Main