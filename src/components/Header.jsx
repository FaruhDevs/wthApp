import React from 'react'
import imageSrc from '../images/logo.png'
function Header() {
  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes} GMT`;
  };

  return (
    <div className='flex flex-row items-center  justify-between pt-3 px-1 custom-sm:px-4 gap-5'>
      <img className='w-24 h-4 md:w-36 md:h-7' src={imageSrc} />
      <p className='text-slate-300 text-xs md:text-sm font-semibold'>{getFormattedDate()}</p>
      <a href="https://github.com/FaruhDevs/wthApp" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-github md:text-2xl text-xl text-white custom-xsm:mr-3"></i>
      </a>
    </div>

  )
}

export default Header