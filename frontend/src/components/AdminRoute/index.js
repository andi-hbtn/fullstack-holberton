
import { Navigate } from "react-router-dom";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { useEffect, useState } from "react";

const AdminRoute = ({ children }) => {
	const { authUser } = useAuthenticateContext();
    const [hasAccess,setHasAccess] = useState(null);

    useEffect(()=> {
        console.log("authUser--in--useEffect--",authUser);
        if (authUser) {
            if (authUser?.roles === 'admin') {
                setHasAccess(true);
            } else {
                setHasAccess(false);
            }
        }
    }, [authUser]);

    console.log("hasAccess----",hasAccess);

    if (hasAccess === null) {
        return <Navigate to="/" />
    } else if (hasAccess) {
        return children
    } else {
        return <Navigate to="/" />
    }
};

export default AdminRoute;
