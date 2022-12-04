import {useEffect, useState} from 'react';
import $api from "../../../http/http";
import {useParams} from "react-router-dom";

import classes from './product.module.scss'

import noopImg from '../../../assets/noopProduct.svg'

function ProductComponent() {
    const {id} = useParams()
    let [product, setProduct] = useState({})

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

    const getProductImage = () => {
        if (product?.imgUUID) {
            return `http://localhost:9000/images/${product?.imgUUID}`
        } else if (product.imgUrl) {
            return product.imgUrl
        } else return noopImg
    }

    return (
        <div className={classes.productWrapper}>
            <div className={classes.productInfo}>
                <img className={classes.productImg} src={getProductImage()} alt="img"/>
                <div className={classes.textInfo}>
                    <p className={classes.productTitle}>{product.productTitle}</p>
                    <p className={classes.productArticle}>Артикул: {product.article}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductComponent;