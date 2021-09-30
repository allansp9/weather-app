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
    <div className="min-w-[500px] flex pb-6 justify-around bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-xl">
      <div className="flex flex-col pt-6 gap-y-3">
        <h2 className="text-3xl">{current.temp.toFixed(0)}&deg;C</h2>
        <div className="flex gap-x-3">
          <div>
            <h3>
              <span className="font-bold">Sunrise</span>
              <br />
              <span>
                {moment
                  .unix(current.sunrise)
                  .tz(weatherData.timezone)
                  .format("LT")}
              </span>
            </h3>
          </div>
          <div>
            <h3>
              <span className="font-bold">Sunset</span>
              <br />
              <span>
                {moment
                  .unix(current.sunset)
                  .tz(weatherData.timezone)
                  .format("LT")}
              </span>
            </h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <Image
          src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          alt={current.weather[0].description}
          layout="fixed"
          width="100"
          height="100"
        />
        <h2 className="text-center -mt-4">{current.weather[0].description}</h2>
      </div>
    </div>
  );
};

export default WeatherDisplay;
