import { createContext, useContext, useState, useEffect } from 'react';
import { get_category_service } from "../services/category";

const CategoryContext = createContext({});

const CategoryProvider = (props) => {
	const [categories, setCategoris] = useState([]);

	useEffect(() => {
		getCategories();
	}, []);

	const getCategories = async () => {
		try {
			const result = await get_category_service();
			if (result.status === 200) {
				setCategoris(result.data);
			}
		} catch (error) {
			console.log("error----", error);
			return error
		}
	}

	const values = { categories };
	return (
		<CategoryContext.Provider value={values}>
			{props.children}
		</CategoryContext.Provider>
	)
}

const useCategoryContext = () => { return useContext(CategoryContext) }
export { CategoryProvider, useCategoryContext }