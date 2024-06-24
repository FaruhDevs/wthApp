// src/CityList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input';

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = '499138f5484a73cfaff5e1a227f2c05a';

  useEffect(() => {
    const fetchCities = async () => {
      try {
        // Load city list file (ensure the path is correct and the file is accessible)
        const cityListResponse = await fetch('/src/utils/city.list.json');
        if (!cityListResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const cityList = await cityListResponse.json();
        const limitedCities = cityList.slice(0, 5);

        const cityDataPromises = limitedCities.map(async (city) => {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?id=${city.id}&appid=${apiKey}`
          );
          console.log(response)
          return {
            name: city.name,
            country: response.data.city.country
          };
        });

        const cityData = await Promise.all(cityDataPromises);
        setCities(cityData);
      } catch (error) {
        console.error("Error fetching city data: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Input cities={cities}/>
      
    </div>
  );
};

export default CityList;
