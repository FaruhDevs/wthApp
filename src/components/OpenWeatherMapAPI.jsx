// src/CityList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OpenWeatherMapAPI = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = '499138f5484a73cfaff5e1a227f2c05a';

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityListResponse = await fetch('../src/utils/city.list.json');
        const cityList = await cityListResponse.json();
        const limitedCities = cityList.slice(0, 10);

        const cityDataPromises = limitedCities.map(async (city) => {
          const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/forecast?id=${city.id}&appid=${apiKey}`
          );
          return {
            name: city.name,
            country: response.data.city.country
          };
        });

        const cityData = await Promise.all(cityDataPromises);
        setCities(cityData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching city data: ", error);
      }
    };

    fetchCities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>City List</h1>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            {city.name}: {city.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OpenWeatherMapAPI;
