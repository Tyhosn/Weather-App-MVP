import React, { useState, useEffect } from 'react';
import Weather from './Weather';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "05b1ec8d528cfded2a5e71f763c7613a"; // Replace with your own API key

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        console.log(data.message); // Log the error message if the request fails
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch the weekly forecast data
    const fetchWeeklyForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (response.ok) {
          // Extract the daily forecast data from the API response
          const dailyForecast = data.list.filter((item) =>
            item.dt_txt.includes("12:00:00")
          );

          // Set the weekly forecast data
          setWeatherData((prevData) => ({
            ...prevData,
            weeklyForecast: dailyForecast,
          }));
        } else {
          console.log(data.message); // Log the error message if the request fails
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch the weekly forecast only if a city is selected
    if (city) {
      fetchWeeklyForecast();
    }
  }, [city, API_KEY]);

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <>
          <Weather weatherData={weatherData} />
          {weatherData.weeklyForecast && (
            <div className="weekly-forecast">
              {weatherData.weeklyForecast.map((forecast) => (
                <div className="day-forecast" key={forecast.dt}>
                  <h3>{forecast.dt_txt.split(" ")[0]}</h3>
                  <p>Temperature: {forecast.main.temp}°C</p>
                  <p>Description: {forecast.weather[0].description}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherApp;
