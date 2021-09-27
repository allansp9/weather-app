import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";

import cities from "../lib/cities.json";

import SearchBox from "../components/search-box";

export default function Home({ cities }) {
  const [selectedCity, setSelectedCity] = useState("");

  console.log(selectedCity);

  return (
    <div className="container flex justify-center items-center h-screen m-auto">
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchBox cities={cities} setSelectedCity={setSelectedCity} />
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {
      cities,
    },
  };
}
