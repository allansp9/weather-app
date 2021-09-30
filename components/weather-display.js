import React from "react";
import CurrentWeatherDisplay from "./current-weather-display";
import WeeklyWeatherDisplay from "./weekly-weather-display";

const WeatherDisplay = ({ weatherData }) => {
  const current = weatherData.current;
  const daily = weatherData.daily;
  const timezone = weatherData.timezone;

  return (
    <div>
      <CurrentWeatherDisplay weather={current} timezone={timezone} />
      <WeeklyWeatherDisplay weather={daily} timezone={timezone} />
    </div>
  );
};

export default WeatherDisplay;
