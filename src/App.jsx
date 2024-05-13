import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import Countries from "./components/Countries";
import countryService from "./services/countries";

const App = () => {
	const [value, setValue] = useState("");
	const [countries, setCountries] = useState(null);

	useEffect(() => {
		if (value) {
			countryService
				.getAll()
				.then((returnedCountries) => setCountries(returnedCountries));
		}
	});

	const handleValue = (event) => {
		setValue(event.target.value);
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

			<Countries
				value={value}
				countries={showCountries}
			/>
		</div>
	);
};

export default App;
