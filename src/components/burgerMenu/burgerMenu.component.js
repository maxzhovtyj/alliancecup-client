import React from 'react';

import classes from "./burgerMenu.module.scss"

const BurgerMenuComponent = ({showBurger}) => {
    return (
        <div className={classes.burgerContainer + ` ${showBurger ? classes.isActive : ""}`}>
            <ul>
                <li>Hello world</li>
            </ul>
        </div>
    );
};

export default BurgerMenuComponent;
