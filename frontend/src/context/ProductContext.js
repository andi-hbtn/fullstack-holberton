import { createContext, useContext, useState, useEffect } from 'react';
import { create_product_service, get_products_service, get_product_service, update_product_service } from "../services/product";
const ProductContext = createContext({});

const ProductProvider = (props) => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		getProducts();
	}, []);

	const createProduct = async (data) => {
		try {
			const result = await create_product_service(data);
			if (result.status === 201) {
				await getProducts();
				return result.data;
			}
		} catch (error) {
			throw error.response.data;
		}
	}

	const getProducts = async () => {
		try {
			const products = await get_products_service();
			if (products.status === 200) {
				setProducts(products.data);
			}
		} catch (error) {
			throw error.response.data;
		}
	}

	const getProduct = async (id) => {
		try {
			const result = await get_product_service(id);
			if (result.status === 200) {
				return result.data;
			}

		} catch (error) {
			throw error.response.data;
		}
	}

	const updateProduct = async (data) => {
		try {
			const result = await update_product_service(data);
			console.log("result-----", result);
			if (result.status === 200) {
				await getProducts()
				return result.data;
			}
		} catch (error) {
			console.log("error--in update--", error);
			throw error.response.data;
		}
	}

	// const deleteProduct = async (id) => {
	// 	try {
	// 		const result = await delete_product_service(id);
	// 		if (result.status === 200) {
	// 			await getProducts();
	// 		}
	// 	} catch (error) {
	// 		console.log("error--in delete method--", error);
	// 		return error
	// 	}
	// }

	const values = { createProduct, updateProduct, getProduct, products };
	return (
		<ProductContext.Provider value={values}>
			{props.children}
		</ProductContext.Provider>
	)
}

const useProductContext = () => { return useContext(ProductContext) }
export { ProductProvider, useProductContext }