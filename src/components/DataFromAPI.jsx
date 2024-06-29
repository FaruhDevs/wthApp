import React from 'react'
import moonIcon from "../images/splash-icon.svg"
import OpenWeatherAPI from "./OpenWeatherAPI"
function DataFromAPI({selectedCity}) {
  return (
    <div className=' '>
      {selectedCity ? 
        (<OpenWeatherAPI selectedCity={selectedCity}/>) : 
        (<div className='flex flex-col  items-center gap-4 pt-36'>
         
        <img src={moonIcon} className='w-24 h-24 md:w-36 md:h-40' alt="" />
        <p className=' max-w-[400px] sm:max-w-[1000px] text-center font-medium text-slate-300 text-sm md:text-lg'>Explore current weather data and 6-day forecast of more than 200,000 cities!</p>  
          </div>)}
    </div>
    

  )
}

export default DataFromAPI