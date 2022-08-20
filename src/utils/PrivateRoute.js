import React, {useContext} from 'react';
import {Outlet, Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


function PrivateRoute({ children }) {
    const {isAuth} = useContext(AuthContext)

    return (
        isAuth ? <Outlet/> : <Navigate to={"/"}/>
    )
}

export default PrivateRoute;