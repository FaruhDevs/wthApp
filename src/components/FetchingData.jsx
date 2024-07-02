import React, { useState, useEffect } from 'react';
import axios from 'axios';

import OpenWeatherAPI from './OpenWeatherAPI'
function FetchingData({selectedCity,setSelectedCity}) {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiKey = '499138f5484a73cfaff5e1a227f2c05a';


    const getCurrentDate = () => {
        const date = new Date();
        const options = {month: 'short',day: 'numeric', };
        return date.toLocaleDateString('en-US', options);
      };





      useEffect(() => {
        if (selectedCity) {
          const fetchWeather = async () => {
            try {
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                  lat: selectedCity.coord.lat,
                  lon: selectedCity.coord.lon,
                  appid: apiKey,
                  units: 'metric' // or 'imperial' if you prefer
                }
              });
       
              setWeatherData(response.data);
              const forecastResponse = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
                params: {
                  lat: selectedCity.coord.lat,
                  lon: selectedCity.coord.lon,
                  appid: apiKey,
                  units: 'metric' // or 'imperial' if you prefer
                }
              });
              
              const sixHourForecast = forecastResponse.data?.hourly?.filter((_, index) => index % 3 === 0).slice(0, 6) ?? [];
              setForecastData(sixHourForecast);
              setLoading(false)
              console.log(sixHourForecast)
              
            } catch (error) {
                console.error('Error fetching the weather data', error.response ? error.response.data : error);
            }
          };
    
          fetchWeather();
        }
      }, [selectedCity, apiKey]);


  return (
    <>
        {weatherData ? (<OpenWeatherAPI 
        selectedCity={selectedCity}
        weatherTemp={Math.round(weatherData.main.temp)}
        weatherDisc={weatherData.weather[0].description}
        todayDate={getCurrentDate()}
        weatherFeel={Math.round(weatherData.main.feels_like)}
        weatherHumidity={weatherData.main.humidity}
        weatherWind={weatherData.wind.speed}
        weatherClouds={weatherData.clouds.all}
        weatherIcon={weatherData.weather[0].icon}
        sixHourForecast={forecastData}
        sixHourLoading={loading}
        />):
        (<p>Loadingssssssssssssssssssssssss</p>)}
    </>
   
  )
}

export default FetchingData