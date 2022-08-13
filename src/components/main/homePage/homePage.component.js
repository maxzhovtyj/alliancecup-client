import React from 'react';
import classes from "../categories/categories.module.scss";
import CategoriesComponent from "../categories/categories.component";

function HomePageComponent(props) {
    return (
        <div>
            <div><h1>Home Page</h1></div>
            <div className={classes.categoriesList}>
                <CategoriesComponent/>
            </div>
        </div>
    );
}

export default HomePageComponent;