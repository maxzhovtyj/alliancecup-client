import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

function AdminRoute(props) {
    const {userRoleId} = useContext(AuthContext)

    return (
        (userRoleId !== 1 && userRoleId) ? <Outlet/> : <Navigate to={"/"}/>
    )
}

export default AdminRoute;