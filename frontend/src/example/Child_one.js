const ChildOne = () => {

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		console.log("name----in handle change Child one", name);
		console.log("value----in handle change Child one", value);
	}

	return (
		<>
			<p>Child One state <strong>: position: framework:</strong></p>
			<h6>Change Parent type</h6>
			<input onChange={handleChange} type="text" name="type" value="" />
		</>
	)
}

export default ChildOne