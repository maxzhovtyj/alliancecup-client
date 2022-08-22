import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../../../context/AuthContext";
import {fetchUserCart} from "../../../redux/userCartRedux/fetchUserCart";
import CartItem from "./cartItem";
import Button from "@mui/material/Button";

import classes from './cart.module.scss'
import {NavLink} from "react-router-dom";

function CartComponent() {
    const {isAuth} = useContext(AuthContext)

    const dispatch = useDispatch()
    const cartProducts = useSelector(state => state.cartPage)

    useEffect(() => {
        dispatch(fetchUserCart(isAuth))
    }, [dispatch, isAuth])

    return (
        <div className={classes.cartPageWrapper}>
            <h1 className={classes.cartTitle}>Кошик</h1>
            <div className={classes.productsList}>
                {
                    cartProducts.cart
                        ?
                        cartProducts.cart.map(item => <CartItem product={item} key={item.article}/>)
                        : "Кошик пустий"
                }
            </div>
            <p>Загальна вартість: {cartProducts.sum}</p>
            {
                cartProducts
                    ?
                    <NavLink to={"/cart/order"}>
                        <Button>Оформити замовлення</Button>
                    </NavLink>
                    : ""
            }
        </div>
    );
}

export default CartComponent;