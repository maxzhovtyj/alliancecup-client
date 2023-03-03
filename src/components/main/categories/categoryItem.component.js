import {useNavigate} from "react-router-dom";

import ItemImage from "../../../UI/ItemImage";
import classes from './categories.module.scss'

function CategoryItemComponent({item: {id, categoryTitle, imgUrl, imgUUID}}) {
    const navigate = useNavigate()

    function toCategory() {
        navigate(`/products?categoryId=${id}`)
    }

    return (
        <div className={classes.categoryItem} onClick={toCategory}>
            <ItemImage cls={classes.categoryImage} item={{imgUUID, imgUrl}} plug={false} alt={"category-image"}/>
            <p className={classes.categoryTitle}>{categoryTitle}</p>
        </div>
    );
}

export default CategoryItemComponent;
