import axios from "axios";
const url = `${process.env.REACT_APP_API_URL}api/product`;

const create_product_service = async (data) => {
	const formData = new FormData();
	formData.append("title", data.title);
	formData.append("description", data.description);
	formData.append("category_id", data.category_id);
	formData.append("image", data.image);
	formData.append("is_active", data.is_active);
	const result = await axios.post(`${url}/create`, formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});
	return result.data;
}

const create_product_variants_service = async (data) => {

	const formData = new FormData();

	data.productVariants.forEach((variant, index) => {
		formData.append('images', variant.color_image);
		formData.append('images', variant.main_image);
	});

	const cleanedVariants = data.productVariants.map(variant => {
		const cleanVariant = { ...variant };
		delete cleanVariant.color_image;
		delete cleanVariant.main_image;
		return cleanVariant;
	});

	formData.append("productVariants", JSON.stringify(cleanedVariants));
	const result = await axios.post(`${url}/product-variants/${data.product_id}`,
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			}
		});
	return result.data;
};

const update_product_variants_service = async (data) => {
	const formData = new FormData();

	const variants = data.map((el, index) => {

		if (el.color_image instanceof File) {
			formData.append('images', el.color_image);
		}
		if (el.main_image instanceof File) {
			formData.append('images', el.main_image);
		}
		return {
			id: el.id,
			color: el.color,
			price: el.price,
			stock: el.stock,
			color_image: el.color_image,
			main_image: el.main_image
		}
	});
	formData.append("productVariants", JSON.stringify(variants));

	const result = await axios.put(`${url}/product-variants/`, formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});
	return result.data;
};

const delete_product_variants_service = async (id) => {
	console.log("id---",id);
	const result = await axios.delete(`${url}/product-variants/${id}`);
	return result.data;
}

const get_products_service = async () => {
	const result = await axios.get(`${url}/all`);
	return result.data;
}

const get_product_service = async (id) => {
	const result = await axios.get(`${url}/${id}`);
	return result.data;
}

const update_product = async (data) => {
	const formData = new FormData();
	formData.append("title", data.title);
	formData.append("description", data.description);
	formData.append("category_id", data.category_id);
	formData.append("image", data.image);
	formData.append("is_active", data.is_active);
	const result = await axios.put(`${url}/update/${data.id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});
	return result.data;
}

const delete_product_service = async (id) => {
	const result = await axios.delete(`${url}/delete/${id}`);
	return result.data;
}

export {
	create_product_service,
	create_product_variants_service,
	update_product_variants_service,
	delete_product_variants_service,
	get_products_service,
	get_product_service,
	update_product,
	delete_product_service
}