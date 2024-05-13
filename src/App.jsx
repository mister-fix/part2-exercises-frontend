import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [filterBy, setFilterBy] = useState("");
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [notification, setNotification] = useState({
		type: null,
		message: null,
	});

	useEffect(() => {
		personService.getAllPersons().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

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

		const personObject = {
			name: newName,
			number: newNumber,
		};

		const checkPerson = persons
			.map((person) => person.name.toLowerCase())
			.includes(newName.toLowerCase());

		if (checkPerson) {
			const confirmChange = window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			);
			const personToUpdate = persons.find(
				(person) => person.name.toLowerCase() == newName.toLowerCase()
			);

			if (confirmChange) {
				personService
					.updatePerson(personToUpdate.id, personObject)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== personToUpdate.id ? person : returnedPerson
							)
						);
						setNewName("");
						setNewNumber("");

						setNotification({
							type: "success",
							message: `Updated ${personToUpdate.name}`,
						});
						setTimeout(() => {
							setNotification({ type: null, message: null });
						}, 3000);
					});
			}
		} else {
			personService.createPerson(personObject).then((returnedPerson) => {
				setPersons([...persons, returnedPerson]);
				setNewName("");
				setNewNumber("");

				setNotification({
					type: "success",
					message: `Added ${returnedPerson.name}`,
				});
				setTimeout(() => {
					setNotification({ type: null, message: null });
				}, 3000);
			});
		}
	};

	const deletePerson = (person) => {
		const accept = window.confirm(`Remove ${person.name} from phonebook?`);

		if (accept) {
			personService
				.removePerson(person.id)
				.then(() => {
					setPersons(persons.filter((p) => p.id !== person.id));

					setNotification({
						type: "warning",
						message: `${person.name} was removed`,
					});
					setTimeout(() => {
						setNotification({ type: null, message: null });
					}, 3000);
				})
				.catch((error) => {
					console.log(error);

					setNotification({
						type: "warning",
						message: `Information on ${person.name} has already been removed from server`,
					});
					setTimeout(() => {
						setNotification({ type: null, message: null });
					}, 3000);
				});
		}
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

			<Notification notification={notification} />

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

			<Persons
				phonebook={filteredPhonebook}
				deletePerson={deletePerson}
			/>
		</div>
	);
};

export default App;
