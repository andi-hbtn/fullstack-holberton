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


	const addQuantity = (variant) => {
		setCart((prevState) => {
			const newItems = [...prevState.items];
			const existingIndex = newItems.findIndex(
				(item) => item.variantId === variant.id
			);

			if (existingIndex !== -1) {
				// Increase quantity of existing item
				newItems[existingIndex] = {
					...newItems[existingIndex],
					quantity: newItems[existingIndex].quantity + 1,
				};
			} else {
				// Add new item if it doesn't exist in the cart
				newItems.push({
					productId: variant.product_id,
					variantId: variant.id,
					color: variant.color,
					reference: variant.reference,
					color_image: variant.color_image,
					main_image: variant.main_image,
					price: variant.price,
					quantity: 1,
				});
			}

			// Recalculate the total price
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

	const removeQuantity = (variant) => {
		setCart((prevState) => {
			const newItems = [...prevState.items];
			const existingIndex = newItems.findIndex(
				(item) => item.variantId === variant.id
			);

			if (existingIndex === -1) return prevState;

			let updatedItems;
			if (newItems[existingIndex].quantity === 1) {
				updatedItems = newItems.filter(
					(item) => item.variantId !== variant.id
				);
			} else {
				updatedItems = newItems.map((item) =>
					item.variantId === variant.id
						? { ...item, quantity: item.quantity - 1 }
						: item
				);
			}

			// Recalculate the total price
			const newTotalPrice = updatedItems.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);

			const updatedCart = {
				...prevState,
				items: updatedItems,
				total_price: newTotalPrice,
			};
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		});
	};

	const addToCart = (product, variant) => {
		setCart((prevState) => {
			const newItems = Array.isArray(prevState.items) ? prevState.items : [];

			// Check if the variant is already in the cart
			const existingIndex = newItems.findIndex(item => item.variantId === variant.id);

			if (existingIndex === -1) {
				// If the variant is not in the cart, add it with all necessary properties
				newItems.push({
					variantId: variant.id,
					productId: product.id,
					title: product.title,
					color: variant.color, // Added color
					image: product.image, // Added product image
					variantColorImage: variant.color_image, // Added color image
					variantMainImage: variant.main_image, // Added main image
					price: variant.price,
					quantity: 1,
				});
			} else {
				// If the variant already exists, just update the quantity
				newItems[existingIndex] = {
					...newItems[existingIndex],
					quantity: newItems[existingIndex].quantity + 1,
				};
			}
			// Recalculate the total price
			const newTotalPrice = newItems.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);

			// Create the updated cart state
			const updatedCart = {
				...prevState,
				items: newItems,
				total_price: newTotalPrice,
			};

			// Save the updated cart to localStorage
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
			throw error.response.data;
		}
	};

	const values = {
		cart,
		setCart,
		addQuantity,
		addToCart,
		removeQuantity,
		createOrder,
		finalCart,
		setFinalCart
	};

	return (
		<CartContext.Provider value={values}>
			{props.children}
		</CartContext.Provider>
	);
};

const useCartContext = () => {
	return useContext(CartContext);
};

export { CartProvider, useCartContext };
