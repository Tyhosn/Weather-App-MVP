import React from 'react';

const Weather = ({ weatherData }) => {
  if (!weatherData || !weatherData.list) {
    return null;
  }

  const { list } = weatherData;

  return (
    <div className="weather">
      <div className="weekly-forecast">
        {list.map((forecast) => {
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
