import React from 'react'
import moonIcon from "../images/splash-icon.svg"

function OpenWeatherAPI({ selectedCity,weatherTemp,weatherDisc,todayDate,weatherFeel,weatherHumidity,weatherWind, weatherClouds,weatherIcon }) {
    const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2   max-w-[1055px] max-h-[2000px] m-5'>
            <div className='flex flex-col   items-center '>
                
                <p className='text-zinc-300 font-medium text-xs sm:text-lg mb-5 mt-4'>CURRENT WEATHER</p>
                
                <div className='grid grid-cols-3 items-center gap-24 mb-9 ml-9'>

                    <div className='flex flex-col items-center justify-center gap-1 '>
                        <p className='text-sm sm:text-lg font-medium text-white text-center w-[150px]'>{selectedCity.name}, {selectedCity.country}</p>
                        <p className='text-zinc-400 text-xs sm:text-sm sm:font-medium'>Today {todayDate}</p>
                    </div>

                    <div className='flex flex-col items-center justify-center gap-1 '>
                        <p className='text-sm sm:text-lg font-medium text-white text-center'>{weatherTemp}°C</p>
                        <p className='text-zinc-400 text-xs sm:text-sm  whitespace-nowrap font-normal sm:font-medium'>{weatherDisc}</p>
                    </div>

                    <img src={iconUrl} className='w-10 h-10 md:w-20 md:h-20' alt="" />

                </div>

                <p className='text-zinc-300 font-medium text-xs sm:text-lg mb-5'>AIR CONDITIONS</p>
                
                <div className='grid grid-cols-4 items-center gap-24 mb-12 ml-6 mr-6'>

                    <div className='flex flex-col items-center justify-center  '>
                        <div className="flex flex-row items-center justify-center gap-3 mb-5">
                            <i className="fa-solid fa-temperature-half text-white text-xl"></i>
                            <p className='text-white text-xs sm:text-sm sm:font-normal whitespace-nowrap'>Real Feel</p>
                        </div>
                        <p className='text-sm sm:text-lg font-medium text-white text-center whitespace-nowrap'>{weatherFeel}°C</p>
                    </div>
                    
                    <div className='flex flex-col items-center justify-center  '>
                        <div className="flex flex-row items-center justify-center gap-3 mb-5">
                            <i className="fa-solid fa-wind text-white text-xl"></i>
                            <p className='text-white text-xs sm:text-sm sm:font-normal whitespace-nowrap'>Wind</p>
                        </div>
                        <p className='text-sm sm:text-lg font-medium text-white text-center whitespace-nowrap'>{weatherWind}m/s</p>
                    </div>

                    <div className='flex flex-col items-center justify-center  '>
                        <div className="flex flex-row items-center justify-center gap-3 mb-5">
                            <i className="fa-solid fa-cloud text-white text-xl"></i>
                            <p className='text-white text-xs sm:text-sm sm:font-normal whitespace-nowrap'>Clouds</p>
                        </div>
                        <p className='text-sm sm:text-lg font-medium text-white text-center whitespace-nowrap'>{weatherClouds}%</p>
                    </div>

                    <div className='flex flex-col items-center justify-center  '>
                        <div className="flex flex-row items-center justify-center gap-3 mb-5">
                            <i className="fa-solid fa-droplet text-white text-xl"></i>
                            <p className='text-white text-xs sm:text-sm sm:font-normal whitespace-nowrap'>Humidity</p>
                        </div>
                        <p className='text-sm sm:text-lg font-medium text-white text-center whitespace-nowrap'>{weatherHumidity}%</p>
                    </div>
                </div>

                
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-zinc-300 font-medium text-xs sm:text-lg mb-0'>AIR CONDITIONS</p> 
                    <p className='text-cyan-500 font-medium text-xs '>1 available forecast</p> 
                    <div className='flex flex-row justify-center items-center mt-3 '>
                        <div className=' w-20 h-24   bg-white bg-opacity-10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg p-6'>
                            <p>15:00</p>
                            <p>150</p>
                        </div> 
                    </div>
                </div>
                


            </div>
            

            <div className='flex flex-col  justify-center items-center'>
                <div>CURRENT WEATHER</div>
                <div>AIR CONDITIONS</div>
                <div>TODAY'S FORECAST</div>

            </div>

        </div>
    )
}

export default OpenWeatherAPI
