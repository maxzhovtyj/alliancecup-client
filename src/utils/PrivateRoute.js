import React from 'react';
import {Outlet, Navigate} from "react-router-dom";


function PrivateRoute({ children }) {
    let isAuth = false

    return (
        isAuth ? <Outlet/> : <Navigate to={"/"}/>
    )
}

export default PrivateRoute;