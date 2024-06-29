import React from 'react'
import moonIcon from "../images/splash-icon.svg"
function OpenWeatherAPI({ selectedCity }) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2   max-w-[1055px] max-h-[2000px] m-5'>
            <div className='flex flex-col   items-center ml-5'>
                <p className='text-zinc-300 font-medium text-lg mb-5'>CURRENT WEATHER</p>
                <div className='grid grid-cols-3 items-center gap-16'>
                    <div className='flex flex-col items-center justify-center gap-1 '>
                        <p className='text-lg font-medium text-white text-center w-[150px] bg-black'>{selectedCity.name}, {selectedCity.country}</p>
                        <p className='text-zinc-400 text-sm font-medium'>Today 29 Jun</p>
                    </div>

                    <div className='flex flex-col items-center justify-center gap-1 '>
                        <p className='text-xl font-medium text-white text-center'>18 °C</p>
                        <p className='text-zinc-400 text-sm font-medium'>moderate rain</p>
                    </div>

                    <img src={moonIcon} className='w-10 h-10 md:w-10 md:h-10' alt="" />
                </div>
                <div>
                    <p className='text-zinc-300 font-medium text-lg'>AIR CONDITIONS</p>
                </div>
                <div>
                    <p className='text-zinc-300 font-medium text-lg'>TODAY'S FORECAST</p>
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
