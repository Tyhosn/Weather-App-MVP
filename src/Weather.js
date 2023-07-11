import React from 'react';

const Weather = ({ weatherData }) => {
  if (!weatherData || !weatherData.list) {
    return null;
  }

  const { list } = weatherData;
  const currentWeather = list[0]; // Assume the first item in the list is the current weather

  return (
    <div className="weather">
      <div className="current-weather">
        <h2>Current Weather</h2>
        <p>Temperature: {currentWeather.main.temp}°C</p>
        <div className="weather-description">
          <img
            src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
            alt={currentWeather.weather[0].description}
            className="weather-icon"
          />
          <p>{currentWeather.weather[0].description}</p>
        </div>
      </div>
      <div className="weekly-forecast">
        {list.slice(1).map((forecast) => { // Start from the second item in the list to exclude current weather
          const { dt, main, weather } = forecast;
          const date = new Date(dt * 1000); // Convert UNIX timestamp to JavaScript Date object
          const day = date.toLocaleDateString('en-US', { weekday: 'long' });
          const temperature = main.temp;
          const description = weather[0].description;
          const icon = weather[0].icon;

          return (
            <div className="day-forecast" key={dt}>
              <h3>{day}</h3>
              <p>Temperature: {temperature}°C</p>
              <div className="weather-description">
                <img
                  src={`http://openweathermap.org/img/wn/${icon}.png`}
                  alt={description}
                  className="weather-icon"
                />
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Weather;
