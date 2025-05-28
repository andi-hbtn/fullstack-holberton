import { createContext, useContext, useState, useEffect } from 'react';
import { create_order_service } from "../services/cart";

const CartContext = createContext({});
const CartProvider = (props) => {

	const [cart, setCart] = useState(() => {
		// Load cart from localStorage on initial state
		const savedCart = localStorage.getItem('cart');
		return savedCart
			? JSON.parse(savedCart)
			: { user_id: null, items: [], total_price: 0 };
	});

	const [finalCart, setFinalCart] = useState(0);

	useEffect(() => {
		const cartFromStorage = JSON.parse(localStorage.getItem("cart") || '{"items": []}');
		const items = Array.isArray(cartFromStorage.items) ? cartFromStorage.items : [];
		const newQtu = items.reduce((total, item) => total + item.quantity, 0);
		setFinalCart(newQtu);
	}, [cart]);

	const addQuantity = (product) => {
		setCart((prevState) => {
			const newItems = Array.isArray(prevState.items) ? prevState.items : [];
			const existingIndex = newItems.findIndex(item => item.id === product.id);
			if (existingIndex !== -1) {
				// Update quantity
				newItems[existingIndex] = {
					...newItems[existingIndex],
					quantity: newItems[existingIndex].quantity + 1,
				};
			} else {
				// Add new item
				newItems.push({
					id: product.id,
					title: product.title,
					image: product.image,
					price: product.price,
					quantity: 2,
				});
			}
			const newTotalPrice = newItems.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);

			const updatedCart = {
				...prevState,
				items: newItems,
				total_price: newTotalPrice
			};
			return updatedCart;
		});
	};

	const removeQuantity = (product) => {
		setCart((prevState) => {
			const prevItems = Array.isArray(prevState.items) ? prevState.items : [];
			const existingItem = prevItems.find(item => item.id === product.id);
			if (!existingItem) return prevState;

			let newItems;
			if (existingItem.quantity === 1) {
				newItems = prevState.items.filter(item => item.id !== product.id);
			} else {
				newItems = prevState.items.map(item =>
					item.id === product.id
						? { ...item, quantity: item.quantity - 1 }
						: item
				);
			}
			const newTotalPrice = newItems.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);

			const updatedCart = {
				...prevState,
				items: newItems,
				total_price: newTotalPrice,
			};
			return updatedCart;
		});
	};

	const addToCart = (product) => {
		setCart((prevState) => {
			const newItems = Array.isArray(prevState.items) ? prevState.items : [];
			const existingIndex = newItems.findIndex(item => item.id === product.id);

			if (existingIndex === -1) {
				// Add new item with quantity = 1
				newItems.push({
					id: product.id,
					title: product.title,
					image: product.image,
					price: product.price,
					quantity: 1,
				});
			}

			const newTotalPrice = newItems.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);

			const updatedCart = {
				...prevState,
				items: newItems,
				total_price: newTotalPrice,
			};
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		});
	};

	const createOrder = async (order, userInfo) => {
		try {
			const result = await create_order_service(order, userInfo);
			if (result.status === 201) {
				return result.data;
			}
		} catch (error) {
			return error
		}
	}

	const values = { cart, setCart, addQuantity, addToCart, removeQuantity, createOrder, finalCart, setFinalCart };
	return (
		<CartContext.Provider value={values}>
			{props.children}
		</CartContext.Provider>
	)
}

const useCartContext = () => { return useContext(CartContext) }
export { CartProvider, useCartContext }