import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom'
import classes from './products.module.scss'

import noopImg from '../../../../assets/noopProduct.svg'

import {AuthContext} from "../../../../context/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material";
import {ShoppingService} from "../../../../service/ShoppingService";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";

function ProductItemComponent({product, setMessage, handleClick, deleteFavourite}) {
    const {isAuth} = useContext(AuthContext)

    let [amount, setAmount] = useState(1)
    let [priceAmount, setPriceAmount] = useState(Number(product.price))

    function setProductAmount(e) {
        const result = e.target.value.replace(/\D/g, '');
        setAmount(result)
        setPriceAmount(Number(parseFloat(String(result * product.price)).toPrecision(15)))
    }

    function addToCart() {
        if (!amount || !priceAmount) {
            setMessage("Неправильна кількість товару, спробуйте ще")
            handleClick()
            return
        }

        const addToCartProduct = {
            productId: product.id,
            quantity: Number(amount),
            priceForQuantity: priceAmount,
            amountInStock: product.amountInStock,
            article: product.article,
            imgUrl: product.imgUrl,
            price: product.price,
            productTitle: product.productTitle,
        }

        ShoppingService.addToCart(isAuth, addToCartProduct).then(res => {
            setMessage(res.message)
            handleClick()
        })
    }

    function addToFavourites() {
        ShoppingService.addToFavourites(isAuth, product).then(res => {
            setMessage(res.message)
            handleClick()
        })
    }

    function deleteFromFavourites() {
        ShoppingService.deleteFromFavourites(isAuth, product.id).then(() => {
            window.location.reload()
        })
    }

    return (
        <div className={classes.productItem}>
            <Link to={`/product/${product.id}`}>
                <img className={classes.productImg} src={product.imgUrl || noopImg} alt="img"/>
            </Link>
            <div className={classes.productInfoWrapper}>
                <Link to={`/product/${product.id}`}>
                    <p className={classes.productTitle}>{product.productTitle}</p>
                </Link>

                <div className={classes.productInfo}>
                    <div className={classes.stockInfo}>
                        {
                            Object.entries(product.packaging).map(entry => {
                                const [key, value] = entry;
                                return <span key={key}>{value} {key}</span>;
                            })
                        }
                    </div>
                    <div className={classes.priceInfo}>
                        <span className={classes.rightBorder}>{product.price} грн/уп</span>
                        <input onChange={setProductAmount} value={amount}/>
                    </div>
                    {
                        product.amountInStock === 0
                            ?
                            <div className={classes.notInStock}>Немає в наявності</div>
                            :
                            <div className={classes.buyInfo}>
                                <span className={classes.rightBorder}>{priceAmount}</span>
                                <AllianceButton align={"center"} variant={"text"} onClick={addToCart}>
                                    Купити
                                </AllianceButton>
                            </div>
                    }
                    {
                        deleteFavourite
                            ?
                            <IconButton
                                className={classes.IconBtn}
                                aria-label="close"
                                onClick={deleteFromFavourites}
                            >
                                <CloseIcon/>
                            </IconButton>
                            :
                            <IconButton
                                className={classes.IconBtn}
                                aria-label="close"
                                onClick={addToFavourites}
                            >
                                <FavoriteBorderIcon/>
                            </IconButton>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductItemComponent;