import axios from "axios";
const url = `${process.env.REACT_APP_API_URL}api/product`;

const create_product_service = async (data) => {
	const formData = new FormData();
	formData.append("title", data.title);
	formData.append("description", data.description);
	formData.append("category_id", parseInt(data.category_id));
	formData.append("price", parseInt(data.price));
	formData.append("stock", parseInt(data.stock));
	formData.append("is_active", data.is_active);
	formData.append("image", data.image);

	const result = await axios.post(`${url}/create`, formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});
	return result;
}

const get_products_service = async () => {
	const result = await axios.get(`${url}/all`);
	return result;
}

const get_product_service = async (id) => {
	const result = await axios.get(`${url}/${id}`);
	return result;
}

const update_product_service = async (data) => {
	const formData = new FormData();
	formData.append("title", data.title);
	formData.append("description", data.description);
	formData.append("category_id", parseInt(data.category_id));
	formData.append("price", parseInt(data.price));
	formData.append("stock", parseInt(data.stock));
	formData.append("is_active", data.is_active);
	formData.append("image", data.image);

	const result = await axios.put(`${url}/update/${data.id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});
	return result;
}

const upload_color_images_service = async (data) => {
	const formData = new FormData();
	// Collect colors and files
	const colorNames = [];
	data.colorVariants.forEach((variant) => {
		// Append the two image files per variant
		formData.append('images', variant.color_image);
		formData.append('images', variant.main_image);
		colorNames.push(variant.colorName);
	});

	formData.append('colors', JSON.stringify(colorNames));

	const result = await axios.post(
		`${url}/upload-colors/${data.product_id}`,
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data"
			}
		}
	);
	return result.data;
};

const delete_product_service = async (id) => {
	const result = await axios.delete(`${url}/delete/${id}`);
	return result;
}

export { create_product_service, get_products_service, get_product_service, update_product_service, upload_color_images_service, delete_product_service }