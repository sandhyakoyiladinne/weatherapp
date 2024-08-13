
import React from 'react';

function WeatherInfo({ weather, unit }) {
  const temperature = unit === 'C' ? weather.current.temp_c : weather.current.temp_f;

  const getWeatherIcon = () => {
    return `https:${weather.current.condition.icon}`;
  };

  return (
    <div className="sidebar">
      <div className="weather-info">
        <h2>Current Weather</h2>
        <div className="weather-details">
          <img src={getWeatherIcon()} alt="Weather Icon" />
          <div>
            <strong>{temperature}</strong>
          </div>
          <div>
            <h3>{weather.location.name}, {weather.location.region}, {weather.location.country}</h3>
            <p>{weather.current.condition.text}</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Pressure: {weather.current.pressure_mb} mb</p>
            <p>Wind: {weather.current.wind_mph} mph</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
