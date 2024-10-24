import { createContext, useContext, useState, useEffect } from 'react';
import { create_book_service, get_books_service, update_book_service, delete_book_service } from "../services/books";

const BookContext = createContext({});

const BookProvider = (props) => {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		getBooks();
	}, []);

	const createBook = async (data) => {
		try {
			const result = await create_book_service(data);
			if (result.status === 201) {
				await getBooks();
			}
		} catch (error) {
			console.log("error--in post method--", error);
			return error
		}
	}

	const getBooks = async () => {
		try {
			const result = await get_books_service();
			if (result.status === 200) {
				setBooks(result.data);
			}
		} catch (error) {
			console.log("error--in get method--", error);
			return error
		}
	}

	const updateBook = async (id, data) => {
		try {
			const result = await update_book_service(id, data);
			if (result.status === 200) {
				await getBooks()
			}
		} catch (error) {
			console.log("error--in update--", error);
			return error
		}
	}

	const deleteBook = async (id) => {
		try {
			const result = await delete_book_service(id);
			if (result.status === 200) {
				await getBooks();
			}
		} catch (error) {
			console.log("error--in delete method--", error);
			return error
		}
	}

	const values = { books, createBook, updateBook, deleteBook };
	return (
		<BookContext.Provider value={values}>
			{props.children}
		</BookContext.Provider>
	)
}

const useBookContext = () => { return useContext(BookContext) }
export { BookProvider, useBookContext }