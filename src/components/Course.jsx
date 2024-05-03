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
	const sum = parts.reduce((sum, part) => sum + part.exercises, 0);

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

export default Course;
