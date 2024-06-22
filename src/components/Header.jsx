import React from 'react'
import imageSrc from '../images/logo.png'
function Header() {
  return (
    <div className='flex flex-row items-center  justify-between pt-3 px-1 custom-sm:px-4 gap-5'>
        <img className='w-24 h-4 md:w-36 md:h-7' src={imageSrc}/>
        <p className='text-slate-300 text-xs md:text-sm font-semibold'>2024-06-20 11:46 GMT</p>
        <i className="fa-brands fa-github md:text-2xl text-xl text-white"></i>
    </div>
    
  )
}

export default Header