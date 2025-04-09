import { createContext, useContext, useState, useEffect } from 'react';
import { register_user_service, login_user_service, logout_user_service,checkAuth_user_service } from "../services/authenticate";

const AuthenticateContext = createContext({});

const AuthenticateProvider = (props) => {
	const [authUser, setAuthUser] = useState({});
	const [trigger, setTrigger] = useState(false);

	useEffect(() => {
		checkAuthUser();
	}, [trigger]);

	const register = async (data) => {
		try {
			const result = await register_user_service(data);
			if (result.status === 201) {
				setAuthUser(result.data);
			}
		} catch (error) {
			console.log("error--in post method--", error);
			return error
		}
	}

	const login = async (data) => {
		try {
			const result = await login_user_service(data);
			console.log("result----",result);
			if (result.status === 201) {
				setAuthUser(result.data);
			}
			return result;
		} catch (error) {
			console.log("error--in get method--", error.response.data);
			return error;
		}
	}

	const logout = async (id, data) => {
		try {
			const result = await logout_user_service();
			console.log("result",result);
			if (result.data.status === 201) {
				setAuthUser([]);
				setTrigger(!trigger);
			}
		} catch (error) {
			return error
		}
	}

	const checkAuthUser = async() => {
		try{
			const result = await checkAuth_user_service();
			if (result.status === 200) {
				setAuthUser(...result.data);
			} else{
				setAuthUser({});
			}
		}catch(error){
			setAuthUser(null);
			return error;
		}
	}
	const values = { authUser, register, login, logout };

	return (
		<AuthenticateContext.Provider value={values}>
			{props.children}
		</AuthenticateContext.Provider>
	)
}

const useAuthenticateContext = () => { return useContext(AuthenticateContext) }
export { AuthenticateProvider, useAuthenticateContext }