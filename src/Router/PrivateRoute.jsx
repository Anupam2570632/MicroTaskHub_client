import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingPage from "../Components/Loader/LoadingPage";
import { AuthContext } from "../Provider/AuthProvider/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext)

    const location = useLocation()

    // if (loading) {
    //     return (
    //        <LoadingPage />
    //     )
    // }
    if (user) {
        return children
    }
    return <Navigate to={'/login'} state={location.pathname}></Navigate>

};

export default PrivateRoute;