const SearchForm = ({ value, onChangeHandler }) => {
	return (
		<div>
			find countries{" "}
			<input
				type="search"
				value={value}
				onChange={onChangeHandler}
			/>
		</div>
	);
};

export default SearchForm;
