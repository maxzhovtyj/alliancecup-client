import React from 'react';
import NavbarComponent from "./navbar/navbar.component";

import classes from './main.module.scss'

function MainComponent(props) {
    return (
        <div>
            <NavbarComponent/>
            <div className={classes.mainWrapper}>
                Початкова сторінка
            </div>
        </div>
    );
}

export default MainComponent;