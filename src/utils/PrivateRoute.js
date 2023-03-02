import {Outlet, Navigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";

function PrivateRoute() {
    const {isAuth} = useAuthContext()

    return (
        isAuth ? <Outlet/> : <Navigate to={"/"}/>
    )
}

export default PrivateRoute;
