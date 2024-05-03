import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [filterBy, setFilterBy] = useState("");
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

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
