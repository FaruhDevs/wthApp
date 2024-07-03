import React from 'react'
import moonIcon from "../images/splash-icon.svg"

function OpenWeatherAPI({ selectedCity, weatherTemp, weatherDisc, todayDate, weatherFeel, weatherHumidity, weatherWind, weatherClouds, weatherIcon, sixHourForecast, sixHourLoading,dailyForecast }) {
    const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    function getDayOfWeek(timestamp) {
        const date = new Date(timestamp * 1000);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
      }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2   max-w-[1055px] max-h-[2000px] m-5'>
            <div className='flex flex-col   items-center '>

                <p className='text-zinc-300 font-medium text-xs sm:text-lg mb-5 mt-4'>CURRENT WEATHER</p>

                <div className='grid grid-cols-3 items-center gap-16 mb-9 ml-9'>

                    <div className='flex flex-col items-center justify-center gap-1 '>
                        <p className='text-sm sm:text-lg font-medium text-white text-center w-[150px]'>{selectedCity.name}, {selectedCity.country}</p>
                        <p className='text-zinc-400 text-xs sm:text-sm sm:font-medium'>Today {todayDate}</p>
                    </div>

                    <div className='flex flex-col items-center justify-center gap-1 '>
                        <p className='text-sm sm:text-lg font-medium text-white text-center'>{weatherTemp}°C</p>
                        <p className='text-zinc-400 text-xs sm:text-sm  whitespace-nowrap font-normal sm:font-medium'>{weatherDisc}</p>
                    </div>

                    <img src={iconUrl} className='w-14 h-14 md:w-20 md:h-20 ' alt="" />

                </div>

                <p className='text-zinc-300 font-medium text-xs sm:text-lg mb-5'>AIR CONDITIONS</p>

                <div className='grid grid-cols-4 items-center gap-24 mb-8 ml-10 mr-10'>

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
                        <p className='text-sm sm:text-lg font-medium text-white text-center whitespace-nowrap'>{weatherWind} m/s</p>
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


                <p className='text-zinc-300 font-medium text-xs sm:text-lg '>AIR CONDITIONS</p>
                <p className='text-cyan-500 font-medium text-xs mb-3'>6 available forecasts</p>

                {sixHourLoading ? (<p>Loading</p>) : <div className='grid grid-cols-3 sm:grid-cols-6  gap-y-5 gap-x-2 sm:gap-x-1 mb-6'>
                    {sixHourForecast.map((forecast, index) => (
                        <div key={index} className={`w-custom-1 h-24 sm:w-20  ${index === 0 ? ("bg-slate-50 bg-opacity-15") : ("bg-blue-300 bg-opacity-5")}  backdrop-blur-md border border-white/0 rounded-lg shadow-lg p-1`}>
                            <p className='text-white text-xxs sm:text-xs text-center mb-3'>
                                {new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <div className='relative justify-center items-center flex '>
                                <img
                                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                                    className='w-12 h-12 md:w-24 md:h-22 object-cover object-center'
                                    alt={forecast.weather[0].description}
                                />
                                <p className='text-white text-center text-base font-semibold absolute -bottom-4 left-0 right-0'>
                                    {Math.round(forecast.temp)}°C
                                </p>
                            </div>
                        </div>
                    ))}
                </div>}



            </div>


            <div className='grid grid-cols-1   '>
                <p className='text-zinc-300 font-medium text-xs sm:text-lg mb-3 sm:mb-3 mt-4 text-center '>WEEKLY FORECAST</p>
                {sixHourLoading ? (<p>Loading</p>) : <div className='flex flex-col  gap-y-1  '>
                    {dailyForecast.map((forecast, index) => (
                        <div key={index} className={`sm:w-custom-2 h-16
                           bg-blue-100 bg-opacity-5 backdrop-blur-md border border-white/0 rounded-lg shadow-lg p-1`}>
                            <div className='grid grid-cols-3 justify-items-center items-center   '>
                                <div className='flex flex-col items-center justify-center mr-14 bg-black w-72'>
                                    <p className='text-white font-medium text-sm sm:text-base'>{getDayOfWeek(forecast.dt)}</p>
                                    <div className='flex flex-row items-center justify-center  -mr-4 -mt-2 '>
                                        <img
                                            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                                            className='w-12 h-12 md:w-12 md:h-12 object-cover object-center  '
                                            alt={forecast.weather[0].description}
                                        />
                                        <p className='whitespace-nowrap text-white text-sm -ml-2'>{forecast.weather[0].description}</p>
                                    </div>
                                </div>

                                <div className='grid grid-rows-2 items-center justify-center mr-1 gap-2 -mt-2'>
                                    <div className="flex items-center justify-center gap-3 ">
                                        <i className="fa-solid fa-temperature-half text-white text-sm"></i>
                                        <p className=' text-sm  sm:font-medium font-normal text-white text-center whitespace-nowrap'>{Math.round(forecast.temp.day)}°C</p>
                                    </div>

                                    <div className="flex  items-center justify-center gap-3 mr-2 ">
                                        <i className="fa-solid fa-cloud text-white text-sm"></i>
                                        <p className='text-sm  sm:font-medium font-normal text-white text-center whitespace-nowrap '>{forecast.clouds}%</p>
                                    </div>
                                </div>

                                <div className='grid grid-rows-2 items-center justify-center mr-1 gap-2 -mt-2'>
                                    <div className="flex items-center justify-center gap-2  ">
                                        <i className="fa-solid fa-wind text-white text-sm"></i>
                                        <p className='text-sm  sm:font-medium font-normal text-white text-center whitespace-nowrap'>{forecast.wind_speed}m/s</p>
                                    </div>

                                    <div className="flex  items-center justify-center gap-3 -ml-0 ">
                                        <i className="fa-solid fa-droplet text-white text-sm"></i>
                                        <p className='text-sm  sm:font-medium font-normal text-white text-center whitespace-nowrap '>{forecast.humidity}%</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>}



            </div>

        </div>
    )
}

export default OpenWeatherAPI
