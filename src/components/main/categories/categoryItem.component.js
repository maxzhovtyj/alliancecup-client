import {Link} from "react-router-dom";

import classes from './categories.module.scss'
import noopImg from "../../../assets/noopProduct.svg";

function CategoryItemComponent({item: {id, categoryTitle, imgUrl, imgUUID}}) {
    if (!imgUrl) {
        imgUrl = "https://www.fil.ion.ucl.ac.uk/wp-content/uploads/2019/05/grey-background-750x500.jpg"
    }

    const getCategoryImage = () => {
        if (imgUUID) {
            return `http://localhost:9000/images/${imgUUID}`
        } else if (imgUrl) {
            return imgUrl
        } else return noopImg
    }

    return (
        <div className={classes.categoryItem}>
            <Link to={`/categories/${id}`}>
                <img className={classes.categoryImage} src={getCategoryImage()} alt="category_img"/>
                <div className={classes.bgItem}/>
                <p>{categoryTitle}</p>
            </Link>
        </div>
    );
}

export default CategoryItemComponent;