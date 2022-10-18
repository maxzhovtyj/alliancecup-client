import {useContext} from 'react';
import {Outlet, Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function PrivateRoute() {
    const {isAuth} = useContext(AuthContext)

    return (
        isAuth ? <Outlet/> : <Navigate to={"/"}/>
    )
}

export default PrivateRoute;