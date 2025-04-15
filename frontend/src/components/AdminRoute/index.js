
import { Navigate } from "react-router-dom";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { useEffect, useState } from "react";

const AdminRoute = ({ children }) => {
	const { authUser } = useAuthenticateContext();
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);

useEffect(() => {
    console.log("authUser----in----useEffect-",authUser);
    
	if (authUser !== null) {
		setHasAccess(authUser?.roles === 'admin');
		setLoading(false);
	}
}, [authUser]);

 if (loading) {
	return <div>Loading...</div>; // or a spinner
}
    return hasAccess ? children : <Navigate to="/" />;
}
export default AdminRoute;
