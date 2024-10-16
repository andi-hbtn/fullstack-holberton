import axios from "axios";

const url = "http://localhost:3000/api/category";

const get_category_service = async () => {
	const result = await axios.get("http://localhost:3000/api/category/all");
	return result;
}

const create_category_service = async (data) => {
	const result = await axios.post(`${url} / create`, data);
	return result;
}

export { get_category_service, create_category_service }