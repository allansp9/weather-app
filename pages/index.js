import Head from "next/head";

import cityList from "../lib/city.list.json";

import SearchBox from "../components/search-box";

export default function Home({ cityList }) {
  return (
    <div className="container flex justify-center items-center h-screen m-auto">
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchBox cities={cityList} />
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {
      cityList,
    },
  };
}
