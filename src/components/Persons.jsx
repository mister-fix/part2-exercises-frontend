const Persons = ({ phonebook, deletePerson }) => {
	return (
		<div>
			{phonebook.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}{" "}
					<button onClick={() => deletePerson(person.id)}>delete</button>
				</p>
			))}
		</div>
	);
};

export default Persons;
