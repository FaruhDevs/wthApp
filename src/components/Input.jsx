import React, { useState, useEffect, useRef } from 'react';

function Input() {
  const [cities, setCities] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [loading, setLoading] = useState(true); // Add loading state
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const timeoutId = useRef(null);

  useEffect(() => {
    // Fetch the city data from the JSON file
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
        setLoading(false); // Set loading to false after cities are fetched
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
        setLoading(false); // Set loading to false even if there's an error
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
        map.set(key, true); // Set any value to Map
        uniqueCities.push(city);
      }
    }
    return uniqueCities;
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    if (!dropdownVisible) {
      setHoveredIndex(-1); // Reset hovered index when dropdown opens
    }
    
  };

  const handleBlur = () => {
    timeoutId.current = setTimeout(() => {
      if (dropdownRef.current && !dropdownRef.current.contains(document.activeElement)) {
        setDropdownVisible(false);
        setHoveredIndex(-1); // Reset hovered index when dropdown closes
        setInputValue("")
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current); // Clear the timeout if the component unmounts
    };
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (!dropdownVisible) setDropdownVisible(true);
    setHoveredIndex(-1); // Reset hovered index when input value changes
    
    // Check if the input value matches any city names
    const matches = cities.some(city => 
      city.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    
    // If no matches found, reset selectedCity and show default placeholder
    if (!matches) {
      setSelectedCity(null);
      
    }
  };
  

  const handleFocus = () => {
    
    setHoveredIndex(-1);
   
    
  };

  const handleKeyDown = (e) => {
    if (!dropdownVisible) return;

    const filteredCities = cities.filter(city =>
      city.name.toLowerCase().startsWith(inputValue.toLowerCase())
    ).slice(0, 5); // Limit to 5 results

    if (e.key === 'ArrowDown') {
      e.preventDefault(); // Prevent default behavior of scrolling the page
      setHoveredIndex(prevIndex =>
        prevIndex < filteredCities.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); // Prevent default behavior of scrolling the page
      setHoveredIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : filteredCities.length - 1
      );
    } else if (e.key === 'Enter') {
      if (hoveredIndex !== -1) {
        handleItemClick(filteredCities[hoveredIndex]);
      } else {
        // Handle case where Enter is pressed with no hovered item selected
        // You may add additional logic here if needed
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
    setHoveredIndex(-1); // Reset hovered index when mouse leaves dropdown
  };

  const handleDropdownMouseLeave = () => {
    setHoveredIndex(-1); // Reset hovered index when mouse leaves dropdown
  };

  const handleItemClick = (city) => {
    setInputValue('');
    setDropdownVisible(false);
    setSelectedCity(city);
    inputRef.current.focus(); // Return focus to the input after selecting an item
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().startsWith(inputValue.toLowerCase())
  ).slice(0, 5); // Limit to 5 results

  return (
    <div className='relative'>
      <div className='mx-3 flex flex-row items-center'>
        <input
          ref={inputRef}
          type="text"
          className={` ${selectedCity ? "placeholder-slate-950 " : "placeholder-zinc-400"}  w-full mt-4 px-4 py-2 border  outline-none text-base rounded-md focus:border-blue-700 cursor-default`}
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
    
          {loading &&
            <i className="fa-solid fa-ellipsis  absolute inset-y-0 right-10 text-xl flex items-center"></i>
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
                className={`px-4 py-2 ${index === hoveredIndex ? 'bg-blue-100' : ''} cursor-pointer`}
                onMouseDown={() => handleItemClick(city)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={handleFocus}
              >
                {city.name}, {city.country}
              </li>
            ))
          ) : (
            <li className='text-center p-2 text-zinc-400 font-semibold' >No options</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Input;
