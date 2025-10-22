import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthenticateContext } from './AuthenticateContext';
import { get_customers_service } from '../services/customer';

const CustomerContext = createContext({});

const CustomerProvider = ({ children }) => {
    const { authUser } = useAuthenticateContext();
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        if (authUser?.roles === 'admin') getCustomers();
    }, [authUser]);

    const getCustomers = async () => {
        const res = await get_customers_service();
        if (res.status === 200) setCustomers(res.data);
    };

    // const getCustomer = async (id) => {
    //     const res = await get_customer_service(id);
    //     if (res.status === 200) setSelectedCustomer(res.data);
    // };

    // const updateCustomer = async (data) => {
    //     const res = await update_customer_service(data);
    //     if (res.status === 200) await getCustomers();
    // };

    const values = { customers, selectedCustomer, getCustomers };
    return (
        <CustomerContext.Provider value={values}>
            {children}
        </CustomerContext.Provider>
    )
};

const useCustomerContext = () => useContext(CustomerContext);
export { CustomerProvider, useCustomerContext }