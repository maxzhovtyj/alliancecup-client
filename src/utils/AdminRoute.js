import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

function AdminRoute() {
    const {isAdmin, isModerator} = useContext(AuthContext)

    return (
        (isAdmin || isModerator) ? <Outlet/> : <Navigate to={"/"}/>
    )
}

export default AdminRoute;