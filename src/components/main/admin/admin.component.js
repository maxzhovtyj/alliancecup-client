import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

import classes from './admin.module.scss'

function AdminComponent() {
    return (
        <div className={classes.adminPageWrapper}>
            <ul className={classes.adminNavbar}>
                <li><NavLink to={"/user/admin/products"}>Товари</NavLink></li>
                <li><NavLink to={"/user/admin/categories"}>Категорії</NavLink></li>
                <li><NavLink to={"/user/admin/moderators"}>Модератори</NavLink></li>
                <li><NavLink to={"/user/admin/orders"}>Замовлення</NavLink></li>
                <li><NavLink to={"/user/admin/supply"}>Постачання</NavLink></li>
                <li><NavLink to={"/user/admin/inventory"}>Інвентаризація</NavLink></li>
            </ul>
            <Outlet/>
        </div>
    );
}

export default AdminComponent;