import {NavLink} from "react-router-dom";

import classes from './categories.module.scss'
import {ShoppingService} from "../../../service/ShoppingService";

function CategoryItemComponent({item: {id, categoryTitle, imgUrl, imgUUID}}) {
    return (
        <div className={classes.categoryItem}>
            <NavLink to={`/products?categoryId=${id}`}>
                <img className={classes.categoryImage} src={ShoppingService.getImage({imgUUID, imgUrl})}
                     alt="category_img"/>
                <div className={classes.bgItem}/>
                <p>{categoryTitle}</p>
            </NavLink>
        </div>
    );
}

export default CategoryItemComponent;