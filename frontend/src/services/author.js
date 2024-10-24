import axios from "axios";

const url = "http://localhost:3000/api/author";

const create_author_service = async (data) => {
	const result = await axios.post(`${url}/create`, data);
	return result;
}

const get_author_service = async () => {
	const result = await axios.get(`${url}/all`);
	return result;
}

const update_author_service = async (id, data) => {
	const result = await axios.put(`${url}/update/${id}`, data);
	return result;
}

const delete_author_service = async (id) => {
	const result = await axios.delete(`${url}/delete/${id}`);
	return result;
}

export { create_author_service, get_author_service, update_author_service, delete_author_service }