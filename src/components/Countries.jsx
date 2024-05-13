import { useState, useEffect } from "react";
import Country from "./Country";
import weatherService from "../services/weather";

const Countries = ({ value, countries, onSelectCountry }) => {
	const [weatherData, setWeatherData] = useState();

	useEffect(() => {
		const retrieveWeatherData = (lat, lon) => {
			weatherService
				.getWeather(lat, lon)
				.then((returnedWeather) => setWeatherData(returnedWeather));
		};

		if (countries && countries.length === 1) {
			const [lat, lon] = countries[0].latlng;
			retrieveWeatherData(lat, lon);
		} else {
			setWeatherData(null);
		}
	}, [countries]);

	if (value && countries) {
		if (countries.length === 1) {
			return (
				<div>
					{countries.map((country) => (
						<Country
							key={country.name.common}
							country={country}
							weatherData={weatherData}
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
