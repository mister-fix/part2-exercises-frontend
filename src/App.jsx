import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import Countries from "./components/Countries";
import Country from "./components/Country";
import countryService from "./services/countries";

const App = () => {
	const [value, setValue] = useState("");
	const [countries, setCountries] = useState(null);
	const [selectedCountry, setSelectedCountry] = useState(null);

	useEffect(() => {
		if (value) {
			countryService
				.getAll()
				.then((returnedCountries) => setCountries(returnedCountries));
		}
	});

	const handleValue = (event) => {
		const searchValue = event.target.value;
		setValue(searchValue);

		if (!searchValue) {
			setSelectedCountry(null);
		}
	};

	const handleSelectedCountry = (country) => {
		setSelectedCountry(country);
	};

	const showCountries = countries
		? countries.filter((country) =>
				country.name.common.toLowerCase().includes(value.toLowerCase())
		  )
		: null;

	return (
		<div>
			<SearchForm
				value={value}
				onChangeHandler={handleValue}
			/>

			{selectedCountry ? (
				<Country country={selectedCountry} />
			) : (
				<Countries
					value={value}
					countries={showCountries}
					onSelectCountry={handleSelectedCountry}
				/>
			)}
		</div>
	);
};

export default App;
