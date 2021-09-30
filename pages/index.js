import Head from "next/head";
import { useState } from "react";

import SearchBox from "../components/search-box";
import Spinner from "../components/spinner";
import WeatherDisplay from "../components/weather-display";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="container flex flex-col justify-center items-center h-screen m-auto">
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-7xl font-bold mb-3">
        Weather<span className="font-thin">App</span>
      </h1>
      <SearchBox setWeatherData={setWeatherData} setLoading={setLoading} />
      {!weatherData && loading && <Spinner />}
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </div>
  );
}
