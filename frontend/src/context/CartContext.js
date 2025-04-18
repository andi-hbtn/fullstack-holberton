import { createContext, useContext, useState,useEffect } from 'react';
import { get_orders_service, create_order_service } from "../services/cart";

const CartContext = createContext({});

const CartProvider = (props) => {
	const [orders,setOrders] = useState(
		{
			user_id: null,
			items:[],
			total_price: 0,
		}
	)
	const [quantity, setQuantity] = useState(
	{
		user_id: null,
		items: [],
		total_price: 0,
	});

	useEffect(() => {
		getOrders();
	},[]);

	const addQuantity = (product) => {
		setQuantity((prevState) => {
			const newItem = [
				...prevState.items,
				{
					product_id: product.id,
					title: product.title,
					image: product.image,
					price: product.price,
					quantity: 1
				}
			];
			const newTotalPrice = newItem.reduce(
				(total, item) => total + (item.quantity * product.price),
				0
			);
			return {
				...prevState,
				items: newItem,
				total_price: newTotalPrice,
				id: product.id
			};
		});
	}

	const removeQuantity = (product) => {
		if (quantity.items.length === 0) {
			return;
		} else {
			setQuantity((prev) => {
				const newItem = prev.items.pop();
				const newPrice = quantity.total_price - product.price
				return {
					...prev,
					item: newItem,
					total_price: newPrice
				};
			});
		}
	}

	const addToCart = () => {
		let existingCart = JSON.parse(localStorage.getItem("items")) || [];
		let found = false;
		existingCart.forEach(element => {
			if (element.id === quantity.id) {
				element.items.push(...quantity.items);
				found = true;
			}
		});
		if (!found) {
			existingCart.push(quantity);
		}
		localStorage.setItem("items", JSON.stringify(existingCart));
	}

	const createOrder = async (data) => {
		try {
			const result = await create_order_service(data);
			if (result.status === 201) {
				await getOrders();
			}
			return result.data;
		} catch (error) {
			throw error.response.data;
		}
	}

	const getOrders = async () => {
		try {
			const result = await get_orders_service();
			if (result.status === 200) {
				setOrders(result.data);
			}
			return result.data;
		} catch (error) {
			throw error.response.data
		}
	}


	const values = { quantity, setQuantity, addQuantity, addToCart, removeQuantity, createOrder, getOrders, orders };
	return (
		<CartContext.Provider value={values}>
			{props.children}
		</CartContext.Provider>
	)
}

const useCartContext = () => { return useContext(CartContext) }
export { CartProvider, useCartContext }