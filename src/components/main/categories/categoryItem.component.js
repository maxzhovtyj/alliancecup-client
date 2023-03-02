import {useNavigate} from "react-router-dom";

import classes from './categories.module.scss'
import {ShoppingService} from "../../../service/ShoppingService";

function CategoryItemComponent({item: {id, categoryTitle, imgUrl, imgUUID}}) {
    const navigate = useNavigate()

    function toCategory() {
        navigate(`/products?categoryId=${id}`)
    }

    return (
        <div className={classes.categoryItem} onClick={toCategory}>
            <img className={classes.categoryImage} src={ShoppingService.getImage({imgUUID, imgUrl})}
                 alt="category_img"/>
            <p className={classes.categoryTitle}>{categoryTitle}</p>
        </div>
    );
}

export default CategoryItemComponent;
