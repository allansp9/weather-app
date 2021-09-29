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
    <div>
      <Combobox onSelect={(address) => selectHandler(address)}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Search some place..."
        />
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
