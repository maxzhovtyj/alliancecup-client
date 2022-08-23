import React, {useEffect, useState} from 'react';
import $api from "../../../http/http";
import {useParams} from "react-router-dom";

import classes from './product.module.scss'

import noopImg from '../../../assets/noopProduct.svg'

function ProductComponent(props) {
    const {id} = useParams()
    let [product, setProduct] = useState({
        info: {
            article: "",
            product_title: "",
            img_url: "",
            price: "",
            units_in_package: "",
            amount_in_stock: "",
        },
        description: []
    })
    useEffect(() => {
        async function fetchProduct() {
            try {
                await $api.get(`api/product?id=${id}`).then(res => {
                    setProduct(res.data)
                })
            } catch (e) {
                console.log(e)
            }
        }

        fetchProduct().then()
    }, [id])
    return (
        <div className={classes.productWrapper}>
            <div className={classes.productInfo}>
                <img className={classes.productImg} src={product.info.img_url || noopImg} alt="img"/>
                <div className={classes.textInfo}>
                    <p className={classes.productTitle}>{product.info.product_title}</p>
                    <p className={classes.productArticle}>Артикул: {product.info.article}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductComponent;