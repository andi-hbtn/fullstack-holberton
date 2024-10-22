import axios from "axios";
const url = "http://localhost:3000/api/category";

const create_category_service = async (data) => {
	const result = await axios.post(`${url}/create`, data);
	return result;
}

const get_category_service = async () => {
	const result = await axios.get(`${url}/all`);
	return result;
}

const update_category_service = async (data) => {
	const result = await axios.put(`${url}/update/${data.id}`, data);
	return result;
}

const delete_category_service = async (id) => {
	const result = await axios.delete(`${url}/delete/${id}`);
	return result;
}

export { get_category_service, create_category_service, update_category_service, delete_category_service }