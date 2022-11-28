import React, {useEffect} from 'react';
import CategoryItemComponent from "./categoryItem.component";

import classes from './categories.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../../redux/shopRedux/shopFetch";

function CategoriesComponent() {
    const categories = useSelector(state => state.shop.categories)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])
    return (
        <div className={classes.categoriesList}>
            {categories.map(item => <CategoryItemComponent item={item} key={item.id}/>)}
        </div>
    );
}

export default CategoriesComponent;