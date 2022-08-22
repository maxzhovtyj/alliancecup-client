import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom'
import classes from './products.module.scss'

import noopImg from '../../../../assets/noopProduct.svg'
import Button from "@mui/material/Button";

import {ThemeProvider} from '@mui/material/styles';
import {muiTextBtnTheme} from "../../../../UI/styles";
import {useDispatch} from "react-redux";
import {AuthContext} from "../../../../context/AuthContext";
import $api from "../../../../http/http";
import {logDOM} from "@testing-library/react";

function ProductItemComponent({product, setMessage, handleClick}) {
    const dispatch = useDispatch()

    const {isAuth} = useContext(AuthContext)

    let [amount, setAmount] = useState(1)
    let [priceAmount, setPriceAmount] = useState(Number(product.price))

    function setProductAmount(e) {
        const result = e.target.value.replace(/\D/g, '');
        setAmount(result)
        setPriceAmount(Number(parseFloat(String(result * product.price)).toPrecision(15)))
    }

    async function addToCart() {
        if (!amount || !priceAmount) {
            setMessage("Неправильна кількість товару, спробуйте ще")
            handleClick()
            return
        }

        const addToCartProduct = {
            product_id: product.id,
            quantity: Number(amount),
            price_for_quantity: priceAmount
        }

        try {
            if (isAuth) {
                await $api.post('/api/client/add-to-cart', addToCartProduct)
                    .catch(function (error) {
                        if (error.response.status === 400) {
                            throw new Error("Помилка: Хибні дані")
                        }
                        if (error.response.status === 401) {
                            throw new Error("Помилка: ви не авторизовані")
                        }
                        if (error.response.status === 500) {
                            if (error.response.data.message.includes("duplicate")) {
                                throw new Error("Помилка: товар уже в кошику")
                            }
                            throw new Error("Помилка: щось пішло не так")
                        }
                    })
            } else {
                // TODO ADD TO CART FOR UNAUTHENTICATED USER
                // localStorage.setItem(cartProducts, )
            }
            setMessage("Товар додано до кошику")
            handleClick()
        } catch (e) {
            setMessage(e.message)
            handleClick()
        }
    }

    return (
        <div className={classes.productItem}>
            <Link to={`/product/${product.id}`}>
                <img className={classes.productImg} src={product.img_url || noopImg} alt="img"/>
            </Link>
            <div className={classes.productInfoWrapper}>
                <Link to={`/product/${product.id}`}>
                    <p className={classes.productTitle}>{product.product_title}</p>
                </Link>

                <div className={classes.productInfo}>
                    <div className={classes.stockInfo}>
                        <span className={classes.rightBorder}>{product.units_in_package} шт/уп</span>
                        <span>{product.packages_in_box} уп/ящ</span>
                    </div>
                    <div className={classes.priceInfo}>
                        <span className={classes.rightBorder}>{product.price} грн/уп</span>
                        <input onChange={setProductAmount} value={amount}/>
                    </div>
                    {
                        product.amount_in_stock === 0
                            ?
                            <div className={classes.notInStock}>Немає в наявності</div>
                            :
                            <div className={classes.buyInfo}>
                                <span className={classes.rightBorder}>{priceAmount}</span>
                                <ThemeProvider theme={muiTextBtnTheme}>
                                    <Button variant={"text"} onClick={addToCart} color="alliance">Купити</Button>
                                </ThemeProvider>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductItemComponent;