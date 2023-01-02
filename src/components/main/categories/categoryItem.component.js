import {Link} from "react-router-dom";

import classes from './categories.module.scss'
import {ShoppingService} from "../../../service/ShoppingService";

function CategoryItemComponent({item: {id, categoryTitle, imgUrl, imgUUID}}) {
    return (
        <div className={classes.categoryItem}>
            <Link to={`/categories/${id}`}>
                <img className={classes.categoryImage} src={ShoppingService.getImage({imgUUID, imgUrl})} alt="category_img"/>
                <div className={classes.bgItem}/>
                <p>{categoryTitle}</p>
            </Link>
        </div>
    );
}

export default CategoryItemComponent;