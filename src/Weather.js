import React, { useEffect, useState } from 'react';
import  './Weather';


const Weather = ({ weatherData }) => {
  const [isDayTime, setIsDayTime] = useState(true);

  useEffect(() => {
    const getCurrentTime = () => {
      const date = new Date();
      const hours = date.getHours();
  
      // Assuming day time is between 6am and 6pm
      const isDay = hours >= 6 && hours < 18;
      setIsDayTime(isDay);
    };
    
    getCurrentTime();
  
    // Update the time every minute
    const intervalId = setInterval(getCurrentTime, 60000);
  
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const { list } = weatherData;
  const currentWeather = list[0].weather[0].main.toLowerCase();

  const getWeatherClass = () => {
    console.log('isDayTime:', isDayTime);
    console.log('currentWeather:', currentWeather);
    
    if (isDayTime) {
      if (currentWeather.includes('clear')) {
        return 'weather-sunny';
      } else if (currentWeather.includes('cloud')) {
        return 'weather-cloudy';
      } else if (currentWeather.includes('rain')) {
        return 'weather-rain';
      }
    }
    return 'weather-default';
  };
  

  return (
    <div className={`weather ${getWeatherClass()}`}>
      <div className="weekly-forecast">
        {list.map((forecast) => {
          const { dt, main, weather } = forecast;
          const date = new Date(dt * 1000);
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const formattedDate = date.toLocaleDateString('en-US', options);
          const temperature = main.temp;
          const description = weather[0].description;
          const icon = weather[0].icon;
          return (
            <div className="day-forecast" key={dt}>
              <h3>{formattedDate}</h3>
              <p>Temperature: {temperature} °C</p>
              <div className="weather-description">
                <img
                  src={`http://openweathermap.org/img/wn/${icon}.png`}
                  alt={description}
                  className="weather-icon"
                />
                <p>This is the {description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
};

export default Weather;

