import React from "react";
import Image from "next/image";
import moment from "moment-timezone";

const WeatherDisplay = ({ weatherData }) => {
  const current = weatherData.current;
  const daily = weatherData.daily;

  // console.log(weatherData);
  // console.log(daily);
  // console.log(city);
  return (
    <div className="bg-blue-300">
      <div>
        <h2>{current.temp.toFixed(0)}&deg;C</h2>
        <div>
          <span>Sunrise</span>
          <span>
            {" "}
            {moment.unix(current.sunrise).tz(weatherData.timezone).format("LT")}
          </span>
        </div>
        <div>
          <span>Sunset</span>
          <span>
            {" "}
            {moment.unix(current.sunset).tz(weatherData.timezone).format("LT")}
          </span>
        </div>
      </div>
      <div>
        <div>
          <Image
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt={current.weather[0].description}
            layout="fixed"
            width="100"
            height="100"
          />
        </div>
        <h2>{current.weather[0].description}</h2>
      </div>
    </div>
  );
};

export default WeatherDisplay;
