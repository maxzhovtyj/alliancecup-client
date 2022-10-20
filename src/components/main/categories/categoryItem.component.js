import React from 'react';
import {Link} from "react-router-dom";

import classes from './categories.module.scss'

function CategoryItemComponent({id, title, imgUrl}) {
    if (!imgUrl) {
        imgUrl = "https://www.fil.ion.ucl.ac.uk/wp-content/uploads/2019/05/grey-background-750x500.jpg"
    }
    // localhost:3000/categories/products?category=Одноразові%20стакани
    return (
        <div className={classes.categoryItem}>
            <Link to={`/categories/${id}`}>
                <img className={classes.categoryImage} src={imgUrl} alt="category_img"/>
                <div className={classes.bgItem}/>
                <p>{title}</p>
            </Link>
        </div>
    );
}

export default CategoryItemComponent;