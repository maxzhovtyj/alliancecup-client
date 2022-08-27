import React from 'react';
import classes from "../categories/categories.module.scss";
import CategoriesComponent from "../categories/categories.component";

function HomePageComponent(props) {
    return (
        <div>
            <div><h1>Тут потрібно додати щось круте</h1></div>
            <div className={classes.categoriesList}>
                <CategoriesComponent/>
            </div>
            <h2>Тут можна додати акційні товари</h2>
        </div>
    );
}

export default HomePageComponent;