import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../../../redux/categoriesRedux/categoriesFetch";
import {useParams} from "react-router-dom";
import ProductItemComponent from "./productItem.component";

import classes from './products.module.scss'

//https://domain.com/category/1

function ProductsComponent() {
    const {id} = useParams()

    const [searchParams, setSearchParams] = useState({
        id: id,
        createdAt: "",
        leftPrice: "0",
        rightPrice: "10",
    })
    const dispatch = useDispatch()
    const products = useSelector(state => state.categories.products)

    useEffect(() => {
        dispatch(fetchProducts(searchParams))
    }, [dispatch, searchParams])

    if (products === null) {
        return (
            <div>
                Товарів не знайдено
            </div>
        )
    }
    return (
        <div>
            <div className={classes.sidebar}>
            </div>
            <div className={classes.productsList}>
                {products.map(item => <ProductItemComponent product={item} key={item.article}/>)}
            </div>
        </div>
    );
}

export default ProductsComponent;