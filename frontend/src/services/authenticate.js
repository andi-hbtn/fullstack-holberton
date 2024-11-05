import axios from "axios";

const url = "http://localhost:3000/api/auth";

const register_user_service = async (data) => {
	const result = await axios.post(`${url}/register`, data);
	return result;
}

const login_user_service = async (data) => {
	const result = await axios.post(`${url}/login`, data);
	return result;
}

const logout_user_service = async () => {
	const result = await axios.post(`${url}/logout`);
	return result;
}

const checkAuth_user_service = async (id, data) => {
	const result = await axios.get(`${url}/checkUser`);
	return result;
}

export { register_user_service, login_user_service, logout_user_service,checkAuth_user_service }