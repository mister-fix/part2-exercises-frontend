import React from "react";

const Country = ({ country }) => {
	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>

			<h4>languages:</h4>
			<ul>
				{Object.keys(country.languages).map((language) => (
					<li key={language}>{country.languages[language]}</li>
				))}
			</ul>

			<img
				src={country.flags.png}
				alt="Country Flag"
				width={150}
			/>
		</div>
	);
};

export default Country;
