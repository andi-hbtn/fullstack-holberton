import { createContext, useContext, useState, useEffect } from 'react';
import { get_orders_service, create_order_service,get_order_service} from "../services/cart";

const CartContext = createContext({});

const CartProvider = (props) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		getOrders();
	}, []);

	const createOrder = async (data) => {
		try {
			const result = await create_order_service(data);
			if (result.status === 201) {
				await get_orders_service();
			}
		} catch (error) {
			return error
		}
	}

	const getOrders = async () => {
		try {
			const result = await get_orders_service();
			if (result.status === 200) {
				setCart(result.data);
			}
		} catch (error) {
			return error
		}
	}

    const getOrderById = async (id) => {
		try {
			const result = await get_order_service(id);
			if (result.status === 200) {
				setCart(result.data);
			}
		} catch (error) {
			return error
		}
	}

	const values = { cart, createOrder , getOrders, getOrderById };
	return (
		<CartContext.Provider value={values}>
			{props.children}
		</CartContext.Provider>
	)
}

const useCartContext = () => { return useContext(CartContext) }
export { CartProvider, useCartContext }