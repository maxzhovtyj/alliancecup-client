import {useContext} from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";

import {AuthContext} from "../../../context/AuthContext";
import {UserService} from "../../../service/UserService";

import classes from './userCabinet.module.scss'
import AllianceButton from "../../../UI/allianceCupButton/allianceButton";

function UserCabinetComponent() {
    const {isAdmin, isModerator, logout} = useContext(AuthContext)

    const userLogout = () => {
        UserService.logout().then(() => {
            logout()
        })
    }

    return (
        <div className={classes.userPage}>
            <h1 className={classes.title}>Особистий кабінет</h1>
            <div className={classes.content}>
                <ul className={classes.sidebar}>
                    <li className={classes.sidebarItem}>
                        <Link to={"/user/personal-info"}>Персональні дані</Link>
                    </li>
                    <li className={classes.sidebarItem}>
                        <Link to={"/user/order-history"}>Історія замовлень</Link>
                    </li>
                    <li className={classes.sidebarItem}>
                        <Link to={"/user/change-password"}>Зміна паролю</Link>
                    </li>
                </ul>
                <Outlet/>
            </div>
            <div className={classes.logoutBtn}>
                <AllianceButton onClick={userLogout}>Вийти</AllianceButton>
                {
                    (isAdmin || isModerator)
                        ?
                        <NavLink to={"admin"}>
                            <AllianceButton variant={"outlined"}>Панель адміністратора</AllianceButton>
                        </NavLink>
                        : ""
                }
            </div>
        </div>
    );
}

export default UserCabinetComponent;