import React from "react";
import moment from "moment-timezone";
import Image from "next/image";

const WeeklyWeatherDisplay = ({ weather, timezone }) => {
  console.log(weather);
  return (
    <div className="flex gap-x-5 flex-wrap mt-10">
      {weather.map(
        (day, index) =>
          index !== 0 && (
            <div
              key={day.dt}
              className="p-2 flex flex-col items-center bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md shadow-xl"
            >
              <p>{moment.unix(day.dt).tz(timezone).format("ddd")}</p>
              <Image
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                layout="fixed"
                width="75"
                height="75"
              />
              <div className="flex gap-x-2 text-xs">
                <p>{day.temp.min.toFixed(0)}&deg;C</p>
                <p>{day.temp.max.toFixed(0)}&deg;C</p>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default WeeklyWeatherDisplay;
