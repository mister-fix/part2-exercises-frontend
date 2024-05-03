import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [filterBy, setFilterBy] = useState("");
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	useEffect(() => {
		console.log("effect");

		axios.get("http://localhost:3001/persons").then((response) => {
			console.log("promise fulfilled");
			setPersons(response.data);
		});
	}, []);

	console.log("rendered", persons.length, "people");

	const handleFilterChange = (event) => {
		setFilterBy(event.target.value);
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();

		const checkPerson = persons
			.map((person) => person.name.toLowerCase())
			.includes(newName.toLowerCase());

		const personObject = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};

		checkPerson
			? alert(`${newName} is already added to phonebook`)
			: setPersons([...persons, personObject]);

		setNewName("");
		setNewNumber("");
	};

	const filteredPhonebook =
		filterBy === ""
			? persons
			: persons.filter((person) =>
					person.name.toLowerCase().includes(filterBy.toLowerCase())
			  );

	return (
		<div>
			<h2>Phonebook</h2>

			<Filter
				filter={filterBy}
				onChange={handleFilterChange}
			/>

			<h2>add a new</h2>

			<PersonForm
				onSubmit={addPerson}
				name={newName}
				nameHandler={handleNameChange}
				number={newNumber}
				numberHandler={handleNumberChange}
			/>

			<h2>Numbers</h2>

			<Persons phonebook={filteredPhonebook} />
		</div>
	);
};

export default App;
