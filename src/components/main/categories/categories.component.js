import React, {useEffect} from 'react';
import CategoryItemComponent from "./categoryItem.component";

import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../../redux/shopRedux/shopFetch";

import classes from './categories.module.scss'

function CategoriesComponent() {
    const categories = useSelector(state => state.shop.categories)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])
    return (
        <div className={classes.categoriesList}>
            {
                categories?.length
                ? categories.map(item => <CategoryItemComponent item={item} key={item.id}/>)
                : <p className={classes.categoriesNotFoundTitle}>Категорій не знайдено</p>
            }
        </div>
    );
}

export default CategoriesComponent;
