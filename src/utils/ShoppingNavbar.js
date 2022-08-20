import {Outlet} from 'react-router-dom'

import NavbarComponent from "../components/main/navbar/navbar.component";

export const ShoppingNavbarRoute = ({children}) => {
    return (
        <>
            <NavbarComponent/>
            <Outlet/>
        </>
    )
}