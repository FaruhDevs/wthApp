import React, { useState, useEffect, useRef } from 'react';
import DataFromAPI from './DataFromAPI';
function Input({selectedCity,setSelectedCity}) {
  const [cities, setCities] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const timeoutId = useRef(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    fetch('./public/city.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const filteredLetterCities = data.filter(city => isEnglishName(city.name));
        const filteredCities = filterUniqueCities(filteredLetterCities);
        setCities(filteredCities);
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  }, []);



  const isEnglishName = (name) => {
    return /^[a-zA-Z\s]+$/.test(name);
  };

  const filterUniqueCities = (data) => {
    const uniqueCities = [];
    const map = new Map();
    for (const city of data) {
      const key = city.name.toLowerCase() + city.country.toLowerCase();
      if (!map.has(key)) {
        map.set(key, true);
        uniqueCities.push(city);
      }
    }
    return uniqueCities;
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    

    
    
    
    if (!dropdownVisible) {
      setHoveredIndex(-1);
    }
  };

  const handleBlur = () => {
    timeoutId.current = setTimeout(() => {
      if (dropdownRef.current && !dropdownRef.current.contains(document.activeElement)) {
        setDropdownVisible(false);
        setHoveredIndex(-1);
        
      }
    }, 100);
  };

 

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current);
      clearTimeout(debounceTimeout.current);
    };
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setLoading(true);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setLoading(false);
      setDropdownVisible(true);
      setHoveredIndex(-1);

      
    }, 500); // Adjust the debounce delay to control loading visibility duration
  };

  const handleFocus = () => {
    setHoveredIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!dropdownVisible) return;

    const filteredCities = cities.filter(city =>
      city.name.toLowerCase().startsWith(inputValue.toLowerCase())
    ).slice(0, 5);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHoveredIndex(prevIndex =>
        prevIndex < filteredCities.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHoveredIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : filteredCities.length - 1
      );
    } else if (e.key === 'Enter') {
      if (hoveredIndex !== -1) {
        handleItemClick(filteredCities[hoveredIndex]);
      }
    } else if (e.key === 'Escape') {
      setDropdownVisible(false);
      setHoveredIndex(-1);
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const handleDropdownMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const handleItemClick = (city) => {
    setInputValue('');
    setDropdownVisible(false);
    setSelectedCity(city);
    inputRef.current.focus();
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().startsWith(inputValue.toLowerCase())
  ).slice(0, 5);

  return (
    <div className='relative'>
      <div className='mx-3 flex flex-row items-center'>
        <input
          ref={inputRef}
          type="text"
          className={` ${selectedCity ? "placeholder-slate-950 " : "placeholder-zinc-400"}    w-full mt-4 px-4 py-2 border  outline-none text-base rounded-md focus:border-blue-700 cursor-default`}
          placeholder={selectedCity ? `${selectedCity.name}, ${selectedCity.country}` : "Search for cities"}
          value={inputValue}
          onChange={handleChange}
          onClick={toggleDropdown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />

        <div onClick={toggleDropdown} className="absolute inset-y-0 right-6 flex items-center" style={{ top: '14px' }}>
          <div className="border-r-2 border-gray-300 h-6 mr-3"></div>
          <i className={`fas fa-caret-down text-slate-300 text-xl hover:text-slate-400 ${dropdownVisible ? "text-slate-500" : ""}`}></i>

          {loading && filteredCities.length>0 &&
            <div className="loading absolute inset-y-0 right-9 mb-5 flex items-center text-3xl">
              <i className="dot">.</i>
              <i className="dot">.</i>
              <i className="dot">.</i>
            </div>
          }
        </div>
      </div>

      {dropdownVisible && (
        <ul
          ref={dropdownRef}
          className="absolute left-3 right-3 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 cursor-default"
          onMouseLeave={handleDropdownMouseLeave}
        >
          {loading ? (
            <li className='text-center p-2 text-zinc-400 font-semibold'>Loading...</li>
          ) : filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <li
                key={city.id}
                className={`px-4 py-2 ${index === hoveredIndex ? 'bg-blue-100' : ''}    ${selectedCity && selectedCity.name === city.name ? 'bg-blue-100' : ''}    cursor-default`}
                onMouseDown={() => handleItemClick(city)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
               
              >
                {city.name}, {city.country}
              </li>
            ))
          ) : (
            <li className='text-center p-2 text-zinc-400 font-semibold'>No options</li>
          )}
        </ul>
      )}
      
    </div>
  );
}

export default Input;
