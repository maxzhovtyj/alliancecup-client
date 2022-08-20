import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../../../context/AuthContext";
import {fetchUserCart} from "../../../redux/userCartRedux/fetchUserCart";
import CartItem from "./cartItem";
import Button from "@mui/material/Button";

import classes from './cart.module.scss'

function CartComponent() {
    const {isAuth} = useContext(AuthContext)

    const dispatch = useDispatch()
    const cartProducts = useSelector(state => state.cartPage)

    useEffect(() => {
        dispatch(fetchUserCart(isAuth))
    }, [dispatch, isAuth])

    function makeOrder() {

    }

    return (
        <div className={classes.cartPageWrapper}>
            <h1 className={classes.cartTitle}>Кошик</h1>
            <div className={classes.productsList}>
                {
                    cartProducts.cart.map(item => <CartItem product={item} key={item.article}/>)
                }
            </div>
            <p>Загальна вартість: {cartProducts.sum}</p>
            <Button onClick={makeOrder}>Оформити замовлення</Button>
        </div>
    );
}

export default CartComponent;