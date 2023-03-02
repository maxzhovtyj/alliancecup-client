import {useAuthContext} from "../context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

function SuperAdminRoute() {
    const {isAdmin} = useAuthContext()

    return (
        (isAdmin) ? <Outlet/> : <Navigate to={"/permission-forbidden"}/>
    )
}

export default SuperAdminRoute;
