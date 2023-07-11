import React from 'react';

const Weather = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { name, main, weather } = weatherData;

  return (
    <div className="weather">
      <h2>{name}</h2>
      <p>Temperature: {main.temp}°C</p>
      <div className="weather-description">
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
          alt={weather[0].description}
          className="weather-icon"
        />
        <p>{weather[0].description}</p>
      </div>
    </div>
  );
};

export default Weather;

