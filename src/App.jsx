import { useState } from "react";

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

			<div>
				filter shown with{" "}
				<input
					value={filterBy}
					onChange={handleFilterChange}
				/>
			</div>

			<h2>add a new</h2>

			<form onSubmit={addPerson}>
				<div>
					name:{" "}
					<input
						value={newName}
						onChange={handleNameChange}
					/>
				</div>

				<div>
					number:{" "}
					<input
						value={newNumber}
						onChange={handleNumberChange}
					/>
				</div>

				<div>
					<button type="submit">add</button>
				</div>
			</form>

			<h2>Numbers</h2>

			{filteredPhonebook.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default App;
