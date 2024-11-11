import { createContext, useContext, useState, useEffect } from 'react';
import { create_book_service, get_books_service, update_book_service, delete_book_service } from "../services/books";
import { useAuthenticateContext } from './AuthenticateContext';
import {get_category_service} from "../services/category";
import {get_author_service} from "../services/author";
const BookContext = createContext({});

const BookProvider = (props) => {
	const {authUser} = useAuthenticateContext();
	const [books, setBooks] = useState([]);
	const [categories,setCategories]=useState([]);
	const [authors,setAuthors]=useState([]);

	useEffect(() => {
		getBooks();
	}, [authUser]);

	const createBook = async (data) => {
		try {
			const result = await create_book_service(data);
			// console.log("result context----",result);
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
			const books = await get_books_service();
			const category = await get_category_service();
			const author = await get_author_service();
			if (books.status === 200) {
				setBooks(books.data);
				setCategories(category.data);
				setAuthors(author.data);
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

	const values = { books,categories,authors,createBook, updateBook, deleteBook };
	return (
		<BookContext.Provider value={values}>
			{props.children}
		</BookContext.Provider>
	)
}

const useBookContext = () => { return useContext(BookContext) }
export { BookProvider, useBookContext }