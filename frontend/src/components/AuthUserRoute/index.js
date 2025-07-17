import { Navigate } from "react-router-dom";
import { useAuthenticateContext } from "../../context/AuthenticateContext";

const AuthUserRoute = ({ children }) => {
    const { authUser, isAuthChecked } = useAuthenticateContext();

    return null
}

export default AuthUserRoute;