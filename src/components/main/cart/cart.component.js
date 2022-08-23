import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../../../context/AuthContext";
import {fetchUserCart} from "../../../redux/userCartRedux/fetchUserCart";
import CartItem from "./cartItem";
import Button from "@mui/material/Button";

import classes from './cart.module.scss'
import {NavLink} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {muiTextBtnTheme} from "../../../UI/styles";

const EmptyCart = () => {
    return (
        <div className={classes.emptyCartWrapper}>
            <h1>Ваш кошик порожній</h1>
            <NavLink to={"/"}>
                <ThemeProvider theme={muiTextBtnTheme}>
                    <Button variant={"outlined"} color={"alliance"}>Перейти до магазину</Button>
                </ThemeProvider>
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
                        <div className={classes.helperText}
                             style={{display: "grid", gridTemplateColumns: "7fr 1fr 1fr 1fr"}}>
                            <p>Продукт</p>
                            <p>Ціна за од.</p>
                            <p>Кількість</p>
                            <p>Сума</p>
                        </div>
                        <div className={classes.productsList}>
                            {cartPage?.cart.map(item => <CartItem key={item.product_id} product={item}/>)}
                        </div>
                        <div className={classes.bottomInfo}>
                            <p className={classes.orderSum}>Загальна вартість: {cartPage.sum}</p>
                            <NavLink to={"/cart/order"}>
                                <ThemeProvider theme={muiTextBtnTheme}>
                                    <Button variant={"outlined"} color={"alliance"}>Оформити замовлення</Button>
                                </ThemeProvider>
                            </NavLink>
                        </div>
                    </>
                    : <EmptyCart/>
            }
        </div>
    );
}

export default CartComponent;