import React from 'react'

function OpenWeatherAPI() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 mt-0 '>
            <div className='flex flex-col  items-sta'>
                <div>
                    <p className='text-zinc-300 font-medium text-lg'>CURRENT WEATHER</p>
                </div>
                <div>
                    <p className='text-zinc-300 font-medium text-lg'>AIR CONDITIONS</p>
                </div>
                <div>
                    <p className='text-zinc-300 font-medium text-lg'>TODAY'S FORECAST</p>
                </div>

            </div>

            <div className='flex flex-col items-start justify-center'>
                <div>CURRENT WEATHER</div>
                <div>AIR CONDITIONS</div>
                <div>TODAY'S FORECAST</div>
            </div>

        </div>
    )
}

export default OpenWeatherAPI
