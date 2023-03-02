import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ProductService} from "../../../service/ProductService";


import ProductCharacteristics from "./productCharacteristics";
import ProductPackaging from "./productPackaging";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {ShoppingService} from "../../../service/ShoppingService";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {IconButton} from "@mui/material";
import AllianceButton from "../../../UI/allianceCupButton/allianceButton";
import {useSnackbarContext} from "../../../context/SnackbarContext";

import classes from './product.module.scss'
function InStock({inStock}) {
    if (inStock && inStock !== 0) {
        return (
            <p className={classes.inStock}><CheckCircleIcon style={{color: "#F7A500"}}/> В наявності</p>
        );
    } else return <p className={classes.inStock}>Немає в наявності</p>
}

function OrderInfo() {
    return (
        <div className={classes.orderInfo}>
            <p>Доставка</p>
            <ul>
                <li>- Самовивіз</li>
                <li>- Доставка Новою Поштою</li>
                <li>- Доставка по м. Рівне</li>
            </ul>

            <p>Оплата</p>
            <ul>
                <li>- Готівкою при отриманні</li>
                <li>- Приват 24</li>
                <li>- Монобанк</li>
            </ul>
        </div>
    );
}

function AddToCart({product, addToCart, amount, setProductAmount}) {
    if (product?.amountInStock && product?.amountInStock !== 0) {
        return (
            <div className={classes.addToCart}>
                <input className={classes.addToCartInput} onChange={setProductAmount} value={amount}/>
                <AllianceButton align={"center"} onClick={addToCart}>
                    Купити
                </AllianceButton>
            </div>
        );
    }
}

function ProductComponent() {
    const snackbar = useSnackbarContext()
    const {id} = useParams()
    let [product, setProduct] = useState({})

    let [amount, setAmount] = useState(1)
    let [priceAmount, setPriceAmount] = useState(Number(product.price))

    useEffect(() => {
        ProductService.getProduct(id).then(res => {
            setProduct(res?.data)
        })
    }, [id])

    function setProductAmount(e) {
        const result = e.target.value.replace(/\D/g, '');
        setAmount(result)
        setPriceAmount(Number(parseFloat(String(result * product.price)).toPrecision(15)))
    }

    function addToFavourites() {
        ShoppingService.addToFavourites(product).then(res => {
            snackbar.setMessage(res.message)
            snackbar.handleClick()
        })
    }

    function addToCart() {
        if (!amount || !priceAmount) {
            snackbar.setMessage("Неправильна кількість товару, спробуйте ще")
            snackbar.handleClick()
            return
        }

        const addToCartProduct = {
            ...product,
            quantity: Number(amount),
            priceForQuantity: priceAmount,
            price: product.price,
        }

        ShoppingService.addToCart(addToCartProduct).then(res => {
            snackbar.setMessage(res.message)
            snackbar.handleClick()
        })
    }

    return (
        <div className={classes.productWrapper}>
            <div className={classes.productInfo}>
                <div className={classes.productImg}>
                    <img src={ShoppingService.getImage(product)} alt="img"/>
                    <IconButton
                        className={classes.favouriteIcon}
                        aria-label="close"
                        onClick={addToFavourites}
                    >
                        <FavoriteBorderIcon/>
                    </IconButton>
                </div>
                <div className={classes.textInfo}>
                    <div>
                        <p className={classes.productTitle}>{product.productTitle}</p>
                        <p className={classes.productArticle}>Артикул: {product.article}</p>
                    </div>
                    <InStock inStock={product?.amountInStock}/>
                    <ProductPackaging packaging={product?.packaging}/>
                    <p className={classes.productPrice}>{product.price} грн/уп</p>
                    <AddToCart amount={amount} addToCart={addToCart} product={product}
                               setProductAmount={setProductAmount}/>
                    <ProductDescription description={product?.description}/>
                </div>
                <OrderInfo/>
            </div>
            <ProductCharacteristics characteristics={product?.characteristics}/>
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
