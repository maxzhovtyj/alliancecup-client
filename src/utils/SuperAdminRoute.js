import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

function SuperAdminRoute() {
    const {isAdmin} = useContext(AuthContext)

    return (
        (isAdmin) ? <Outlet/> : <Navigate to={"/permission-forbidden"}/>
    )
}

export default SuperAdminRoute;