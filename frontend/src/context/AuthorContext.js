import { createContext, useContext, useState, useEffect } from 'react';
import { create_author_service, get_author_service, update_author_service, delete_author_service } from "../services/author";

const AuthorContext = createContext({});

const AuthorProvider = (props) => {
	const [authors, setAuthor] = useState([]);

	useEffect(() => {
		getAuthor();
	}, []);

	const createAuthor = async (data) => {
		try {
			const result = await create_author_service(data);
			if (result.status === 201) {
				await getAuthor();
			}
		} catch (error) {
			console.log("error--in post method--", error);
			return error
		}
	}

	const getAuthor = async () => {
		try {
			const result = await get_author_service();
			if (result.status === 200) {
				setAuthor(result.data);
			}
		} catch (error) {
			console.log("error--in get method--", error);
			return error
		}
	}

	const updateAuthor = async (id, data) => {
		try {
			const result = await update_author_service(id, data);
			if (result.status === 200) {
				await getAuthor()
			}
		} catch (error) {
			return error
		}
	}

	const deleteAuthor = async (id) => {
		try {
			const result = await delete_author_service(id);
			if (result.status === 200) {
				await getAuthor();
			}
		} catch (error) {
			console.log("error--in delete method--", error);
			return error
		}
	}

	const values = { authors, updateAuthor, createAuthor, deleteAuthor };
	return (
		<AuthorContext.Provider value={values}>
			{props.children}
		</AuthorContext.Provider>
	)
}

const useAuthorContext = () => { return useContext(AuthorContext) }
export { AuthorProvider, useAuthorContext }