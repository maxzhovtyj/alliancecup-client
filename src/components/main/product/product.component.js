import {useEffect, useState} from 'react';
import $api from "../../../http/http";
import {useParams} from "react-router-dom";

import classes from './product.module.scss'

import noopImg from '../../../assets/noopProduct.svg'
import ProductCharacteristics from "./productCharacteristics";
import ProductPackaging from "./productPackaging";

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
            <p className={classes.productTitle}>{product.productTitle}</p>
            <div className={classes.productInfo}>
                <img className={classes.productImg} src={getProductImage()} alt="img"/>
                <div className={classes.textInfo}>
                    <p className={classes.productArticle}>Артикул: {product.article}</p>
                    <ProductPackaging packaging={product?.packaging}/>
                    <ProductDescription description={product?.description}/>
                    <ProductCharacteristics characteristics={product?.characteristics}/>
                </div>
            </div>
        </div>
    );
}

function ProductDescription({description}) {
    if (description) {
        return (
            <div className={classes.description}>
                <p className={classes.descriptionTitle}>Опис</p>
                <p className={classes.descriptionText}>{description}</p>
            </div>
        );
    } else return ""
}

export default ProductComponent;