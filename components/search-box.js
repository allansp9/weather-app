import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  useBoolean,
  useOutsideClick,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import axios from "axios";

const SearchBox = ({ coords }) => {
  console.log(coords);
  // const [query, setQuery] = useState("");
  // const [flag, setFlag] = useBoolean();
  // const listRef = useRef();
  // const inputRef = useRef();

  // useOutsideClick({ ref: listRef, handler: () => closeSearch() });

  // // let filteredCities = [];

  // // if (query !== "") {
  // //   for (let city of cities) {
  // //     if (filteredCities.length > 10) {
  // //       break;
  // //     }
  // //     const match = city.name.toLowerCase().startsWith(query.toLowerCase());

  // //     if (match) {
  // //       filteredCities.push(city);
  // //     }
  // //   }
  // // }

  // // const closeSearch = () => {
  // //   setFlag.off();
  // //   if (inputRef.current) {
  // //     setQuery("");
  // //   }
  // // };

  const getWeatherData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric&exclude=minutely`
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  getWeatherData();
  // console.log(filteredCities);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl mb-10">Weather App</h1>
      {/* <div className="w-full h-[400px]">
        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            value={query}
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            onClick={setFlag.on}
            ref={inputRef}
          />
        </InputGroup>
        {flag && filteredCities.length > 0 && (
          <List
            ref={listRef}
            className="border-2 rounded-md border-[#3182ce] shadow mt-1 p-2 w-full"
          >
            {filteredCities.map((city) => (
              <ListItem
                key={city.id}
                onClick={() => {
                  getWeatherData(city);
                  closeSearch();
                }}
                className="p-2 hover:bg-gray-200"
              >
                {city.name} - ({city.country})
              </ListItem>
            ))}
          </List>
        )}
      </div> */}
    </div>
  );
};

export default SearchBox;
