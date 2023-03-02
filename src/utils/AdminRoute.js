import {useAuthContext} from "../context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

function AdminRoute() {
    const {isAdmin, isModerator} = useAuthContext()

    return (
        (isAdmin || isModerator) ? <Outlet/> : <Navigate to={"/permission-forbidden"}/>
    )
}

export default AdminRoute;
