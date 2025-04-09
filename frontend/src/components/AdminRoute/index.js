
import { Navigate } from "react-router-dom";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { useEffect, useState } from "react";

const AdminRoute = ({ children }) => {
	const { authUser } = useAuthenticateContext();
    const [hasAccess,setHasAccess] = useState(null);

    useEffect(()=> {
        if (authUser) {
            if (authUser?.roles === 'admin') {
                setHasAccess(true);
            } else {
                setHasAccess(false);
            }

        }
    }, [authUser]);

    if (hasAccess === null) {
        return <>Loading...</>
    } else if (hasAccess) {
        return children
    } else {
        return <Navigate to="/" />
    }
};

export default AdminRoute;
