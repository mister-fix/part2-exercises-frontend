const Persons = (props) => {
	const phonebook = props.phonebook;

	return (
		<div>
			{phonebook.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default Persons;
