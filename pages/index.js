import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import SearchBox from "../components/search-box";
import WeatherDisplay from "../components/weather-display";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div className="container flex flex-col justify-center items-center h-screen m-auto">
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBox setWeatherData={setWeatherData} />
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </div>
  );
}
