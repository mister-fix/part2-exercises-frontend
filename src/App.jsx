const Header = (props) => {
	const text = props.text;

	return <h2>{text}</h2>;
};

const Part = (props) => {
	const part = props.part;

	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Content = (props) => {
	const parts = props.parts;

	return (
		<div>
			{parts.map((part) => (
				<Part
					key={part.id}
					part={part}
				/>
			))}
		</div>
	);
};

const Total = (props) => {
	const parts = props.parts;
	let sum = 0;

	for (let i = 0; i < parts.length; i++) {
		sum += parts[i].exercises;
	}

	return (
		<div>
			<strong>total of {sum} exercises</strong>
		</div>
	);
};

const Course = (props) => {
	const course = props.course;

	return (
		<div>
			<Header text={course.name} />

			<Content parts={course.parts} />

			<Total parts={course.parts} />
		</div>
	);
};

const App = () => {
	const course = {
		id: 1,
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
				id: 1,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
				id: 2,
			},
			{
				name: "State of a component",
				exercises: 14,
				id: 3,
			},
		],
	};

	return <Course course={course} />;
};

export default App;
