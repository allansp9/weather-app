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

const SearchBox = ({ cities, setSelectedCity }) => {
  const [query, setQuery] = useState("");
  const [flag, setFlag] = useBoolean();
  const listRef = useRef();
  const inputRef = useRef();

  useOutsideClick({ ref: listRef, handler: () => closeSearch() });

  let filteredCities = [];

  if (query !== "") {
    for (let city of cities) {
      if (filteredCities.length > 4) {
        break;
      }
      const match = city.name.toLowerCase().startsWith(query.toLowerCase());

      if (match) {
        filteredCities.push(city);
      }
    }
  }

  const closeSearch = () => {
    setFlag.off();
    if (inputRef.current) {
      setQuery("");
    }
  };

  console.log(filteredCities);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1>Weather App</h1>
      <div className="w-full h-[400px]">
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
                key={city.geonameid}
                onClick={() => {
                  setSelectedCity(city.name);
                  closeSearch();
                }}
                className="p-2 hover:bg-gray-200"
              >
                {city.name}, {city.subcountry} ({city.country})
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
