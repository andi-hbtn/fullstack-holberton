import axios from "axios";
const url = "http://localhost:3000/api/book";

const create_book_service = async (data) => {

	const book = {
		title: data.title,
		description: data.description,
		price: parseInt(data.price),
		category_id: parseInt(data.category_id),
		author_id: parseInt(data.author_id),
		is_active: data.is_active,
		image:data.image
	}
	console.log("book-----",book);
	
	const result = await axios.post(`${url}/create`,book,{
			headers:{
					"Content-Type":"multipart/form-data"
				}
		});
	return result;
}

const get_books_service = async () => {
	const result = await axios.get(`${url}/all`);
	return result;
}

const update_book_service = async (id, data) => {

	const book = {
		author_id: parseInt(data.author_id),
		category_id: parseInt(data.category_id),
		description: data.description,
		is_active: data.is_active,
		price: parseInt(data.price),
		title: data.title,
		image:data.image
	}
	const result = await axios.put(`${url}/update/${id}`, book);
	return result;
}

const delete_book_service = async (id) => {
	const result = await axios.delete(`${url}/delete/${id}`);
	return result;
}

export { get_books_service, create_book_service, update_book_service, delete_book_service }