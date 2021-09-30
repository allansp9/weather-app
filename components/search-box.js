import Image from "next/image";
import axios from "axios";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

function SearchBox({ setWeatherData }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });
  const selectHandler = async (address) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric&exclude=hourly,minutely`
        )
        .then(function (response) {
          setWeatherData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mb-8">
      <Combobox onSelect={(address) => selectHandler(address)}>
        <div className="flex">
          <ComboboxInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            placeholder="Search some place..."
            className="border-2 border-blue-400 w-full p-4"
          />
          <button onClick={() => setValue("")} className="-ml-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {status === "OK" && (
          <ComboboxPopover>
            <ComboboxList>
              {data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
              <li className="text-right">
                <Image
                  src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
                  alt="Powered by Google"
                  layout="fixed"
                  height="18"
                  width="144"
                />
              </li>
            </ComboboxList>
          </ComboboxPopover>
        )}
      </Combobox>
    </div>
  );
}

export default SearchBox;
