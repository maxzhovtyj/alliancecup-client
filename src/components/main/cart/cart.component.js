import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../../../context/AuthContext";
import {fetchUserCart} from "../../../redux/userCartRedux/fetchUserCart";
import CartItem from "./cartItem";

import classes from './cart.module.scss'
import {NavLink} from "react-router-dom";
import AllianceButton from "../../../UI/allianceCupButton/allianceButton";

const EmptyCart = () => {
    return (
        <div className={classes.emptyCartWrapper}>
            <h1>Ваш кошик порожній</h1>
            <NavLink to={"/"}>
                <AllianceButton>
                    Перейти до магазину
                </AllianceButton>
            </NavLink>
        </div>
    )
}

function CartComponent() {
    const {isAuth} = useContext(AuthContext)

    const dispatch = useDispatch()
    const cartPage = useSelector(state => state.cartPage)

    useEffect(() => {
        dispatch(fetchUserCart(isAuth))
    }, [dispatch, isAuth])

    return (
        <div className={classes.cartPageWrapper}>
            {
                (cartPage.cart?.length)
                    ?
                    <>
                        <h1 className={classes.cartTitle}>Кошик</h1>
                        <div className={classes.productsList}>
                            {cartPage?.cart.map(item => <CartItem key={item.productId} product={item}/>)}
                        </div>
                        <div className={classes.bottomInfo}>
                            <p className={classes.orderSum}>Загальна вартість: {cartPage.sum}</p>
                            <NavLink to={"/cart/order"}>
                                <AllianceButton>
                                    Оформити замовлення
                                </AllianceButton>
                            </NavLink>
                        </div>
                    </>
                    : <EmptyCart/>
            }
        </div>
    );
}

export default CartComponent;