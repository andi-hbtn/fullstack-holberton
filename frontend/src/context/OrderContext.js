import { createContext, useContext, useState, useEffect } from "react";
import { get_orders_service, get_order_service } from "../services/cart";
const OrderContext = createContext({});
const OrderProvider = (props) => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getAllOrders();
    }, []);


    const getAllOrders = async () => {
        try {
            const result = await get_orders_service();
            if (result.status === 200) {
                setOrders(result.data);
                return result.data;
            }
        } catch (error) {
            throw error
        }
    }

    const getOrderById = async (id) => {
        try {
            const result = await get_order_service(id);
            if (result.status === 200) {
                return result.data;
            }
        } catch (error) {
            throw error
        }
    }

    const values = { orders, getOrderById };

    return (
        <OrderContext.Provider value={values}>
            {props.children}
        </OrderContext.Provider>
    )
}

const useOrderContext = () => { return useContext(OrderContext) }
export { OrderProvider, useOrderContext }