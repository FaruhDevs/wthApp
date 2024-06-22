import React from 'react'
import { useState } from 'react';
function Input() {
  const cities = [
    'Amsterdam', 'Berlin', 'Copenhagen', 'Dublin', 'Edinburgh', 'Florence', 'Geneva', 'Hamburg', 'Istanbul', 'Jakarta'
  ];
  const [inputValue, setInputValue] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleBlur = () => {
    // You might want to add a delay here to ensure the click event on dropdown item is registered before hiding it.
    setTimeout(() => setDropdownVisible(false), 100);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleFocus = () => {
    
    setHoveredIndex(-1); // Reset hovered index on focus
  };

  const handleKeyDown = (e) => {
    if (!dropdownVisible) return;

    if (e.key === 'ArrowDown') {
      setHoveredIndex(prevIndex =>
        prevIndex < filteredCities.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      setHoveredIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === 'Enter' && hoveredIndex !== -1) {
      setInputValue(filteredCities[hoveredIndex]);
      setDropdownVisible(false);
    }
  };

  const filteredCities = cities
    .filter(city => city.toLowerCase().includes(inputValue.toLowerCase()))
    .sort()
    .slice(0, 5);
  return (
    <div className='relative'>
      <div className='mx-3 flex flex-row items-center'>
        <input
          type="text"
          className="w-full mt-4 px-4 py-2 border  text-slate-950 outline-none  text-base rounded-md  focus:border-blue-700 cursor-default"
          placeholder="Search for cities"
          value={inputValue}
          onChange={handleChange}
          onClick={toggleDropdown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />

        <div onClick={toggleDropdown} className="absolute inset-y-0 right-6 flex  items-center" style={{ top: '14px' }}>
          <div className="border-r-2 border-gray-300 h-6 mr-3"></div>
          <i  className={`fas fa-caret-down text-slate-300 text-xl hover:text-slate-400 ${dropdownVisible ? "text-slate-500":""} `}></i>
        </div>
      </div>

      {dropdownVisible && (
        <ul className="absolute left-3 right-3 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {filteredCities.map((city, index) => (
            <li
              key={index}
              className={`px-4 py-2 ${index === 0 && hoveredIndex === -1 ? 'bg-blue-100' : ''} ${hoveredIndex === index ? 'bg-blue-100 ' : ''} hover:bg-blue-100`}
              onMouseDown={() => setInputValue(city)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>



  )
}

export default Input