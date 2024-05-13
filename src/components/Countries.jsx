import Country from "./Country";

const Countries = ({ value, countries, onSelectCountry }) => {
	if (value && countries) {
		if (countries.length === 1) {
			return (
				<div>
					{countries.map((country) => (
						<Country
							key={country.name.common}
							country={country}
						/>
					))}
				</div>
			);
		} else if (countries.length > 10) {
			return <div>Too many matches, specify another filter</div>;
		} else {
			return (
				<div>
					{countries.map((country) => (
						<div key={country.name.common}>
							{country.name.common}{" "}
							<button onClick={() => onSelectCountry(country)}>show</button>
						</div>
					))}
				</div>
			);
		}
	}
};

export default Countries;
