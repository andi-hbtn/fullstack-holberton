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

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addQuantity = (product) => {
		//console.log("product---", product);
		setCart((prevState) => {
			const newItems = [...prevState.items];
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
				total_price: newTotalPrice
			};
			return updatedCart;
		});
	};

	const removeQuantity = (product) => {
		setCart((prevState) => {
			const existingItem = prevState.items.find(item => item.id === product.id);
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
			return {
				...prevState,
				items: newItems,
				total_price: newTotalPrice
			};
		});
	};

	const addToCart = () => {
		if (cart.items.length === 0) return;
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	const createOrder = async (order) => {
		try {
			const result = await create_order_service(order);
			if (result.status === 201) {
				return result.data;
			}
		} catch (error) {
			return error
		}
	}

	const values = { cart, setCart, addQuantity, addToCart, removeQuantity, createOrder };
	return (
		<CartContext.Provider value={values}>
			{props.children}
		</CartContext.Provider>
	)
}

const useCartContext = () => { return useContext(CartContext) }
export { CartProvider, useCartContext }