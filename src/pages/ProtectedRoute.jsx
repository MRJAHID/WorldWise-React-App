import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/FakeAuthContext.jsx";
import {useEffect} from "react";

const ProtectedRoute = ({children}) => {

    const {isAuthenticated} = useAuth()

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [navigate, isAuthenticated]);

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;