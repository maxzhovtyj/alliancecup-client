import React from 'react';
import {useNavigate} from "react-router-dom";

import classes from "./burgerMenu.module.scss"
import {useBurgerContext} from "../../context/BurgerContext";

const BurgerMenuComponent = () => {
    const {showBurger, toggleBurger} = useBurgerContext()
    const navigate = useNavigate()

    const onNavigation = (path) => {
        return () => {
            toggleBurger()
            navigate(path)
        }
    }

    return (
        <div className={[classes.burgerContainer, (showBurger) ? classes.isActive : ""].join(" ")}>
            <ul className={classes.sidebarList}>
                <li className={classes.sidebarItem} onClick={onNavigation("/categories")}>
                    Каталог
                </li>
                <li className={classes.sidebarItem} onClick={onNavigation("/user")}>
                    Кабінет
                </li>
                <li className={classes.sidebarItem}>
                    Пошук
                </li>
                <li className={classes.sidebarItem} onClick={onNavigation("/about-us")}>
                    Про нас
                </li>
                <li className={classes.sidebarItem} onClick={onNavigation("/delivery")}>
                    Доставка
                </li>
                <li className={classes.sidebarItem} onClick={onNavigation("/contacts")}>
                    Контакти
                </li>
                <li className={classes.sidebarItem} onClick={onNavigation("/for-wholesalers")}>
                    Для оптовиків
                </li>
            </ul>
        </div>
    );
};

export default BurgerMenuComponent;
