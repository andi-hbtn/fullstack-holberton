import axios from "axios";
const url = `${process.env.REACT_APP_API_URL}api/order`;

const create_order_service = async (data, userInfo) => {
	console.log("userInfo----", userInfo);

	const payload = {
		...data,
		...userInfo,
	};

	console.log("payload---", payload);
	const result = await axios.post(`${url}/create`, payload);
	return result;
}

const get_orders_service = async () => {
	const result = await axios.get(`${url}/all`);
	return result;
}

const get_order_service = async (id) => {
	const result = await axios.get(`${url}/${id}`);
	return result;
}

const update_orderStatus_service = async (id, status) => {
	const result = await axios.put(`${url}/update-status/${id}`, { status });
	return result;
}

export { get_orders_service, create_order_service, get_order_service, update_orderStatus_service }