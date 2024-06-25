import React, { useState, useEffect, useRef } from 'react';

function Input() {
  const [cities, setCities] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

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
        // Filter cities to include only those with unique names and country codes
        const filteredLetterCities = data.filter(city => isEnglishName(city.name));
        const filteredCities = filterUniqueCities(filteredLetterCities);

        setCities(filteredCities);
      })
      .catch(error => console.error('Error fetching cities:', error));
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
    setTimeout(() => {
      if (!dropdownRef.current.contains(document.activeElement)) {
        setDropdownVisible(false);
        setHoveredIndex(-1); // Reset hovered index when dropdown closes
      }
    }, 100);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (!dropdownVisible) setDropdownVisible(true);
    setHoveredIndex(-1); // Reset hovered index when input value changes
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
        handleItemClick(filteredCities[hoveredIndex].name);
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

  const handleItemClick = (cityName) => {
    setInputValue(cityName);
    setDropdownVisible(false);
    setSelectedCity(cityName);
    inputRef.current.focus(); // Return focus to the input after selecting an item
    setInputValue("")
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
        
          className={` ${ selectedCity ? "placeholder-slate-950 " : "placeholder-zinc-400"}  w-full mt-4 px-4 py-2 border  outline-none text-base rounded-md focus:border-blue-700 cursor-default`}
          placeholder={selectedCity ? selectedCity: "Search for cities"}
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
        </div>
      </div>

      {dropdownVisible && (
        <ul
          ref={dropdownRef}
          className="absolute left-3 right-3 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10"
          onMouseLeave={handleDropdownMouseLeave}
        >
          {filteredCities.map((city, index) => (
            <li
              key={city.id}
              className={`px-4 py-2 ${index === hoveredIndex ? 'bg-blue-100' : ''}`}
              onMouseDown={() => handleItemClick(city.name)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Input;

