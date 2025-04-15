import { createContext, useContext, useState, useEffect } from 'react';
import { create_category_service, get_category_service, update_category_service, delete_category_service } from "../services/category";
import { useAuthenticateContext } from './AuthenticateContext';

const CategoryContext = createContext({});

const CategoryProvider = (props) => {
	const {authUser} = useAuthenticateContext();
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getCategories();
	}, [authUser]);

	const createCategories = async (data) => {
		try {
			const result = await create_category_service(data);
			if (result.status === 201) {
				await getCategories();
				return result.data;
			}
		} catch (error) {
			console.log("error--in post method--", error);
			throw error.response.data;
		}
	}

	const getCategories = async () => {
		try {
			const result = await get_category_service();
			if (result.status === 200) {
				setCategories(result.data);
			}
		} catch (error) {
			console.log("error--in get method--", error);
			return error
		}
	}

	const updateCategory = async (data) => {
		try {
			const result = await update_category_service(data);
			if (result.status === 200) {
				await getCategories();
				return result.data;
			}
		} catch (error) {
			console.log("error--in update--", error);
			throw error.response.data;
		}
	}

	const deleteCategorie = async (id) => {
		try {
			const result = await delete_category_service(id);
			if (result.status === 200) {
				await getCategories();
			}
		} catch (error) {
			console.log("error--in delete method--", error);
			throw error.response.data;
		}
	}

	const values = { categories, updateCategory, createCategories, deleteCategorie };
	return (
		<CategoryContext.Provider value={values}>
			{props.children}
		</CategoryContext.Provider>
	)
}

const useCategoryContext = () => { return useContext(CategoryContext) }
export { CategoryProvider, useCategoryContext }