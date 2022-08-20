import React from 'react';
import noopImg from '../../../assets/noopProduct.svg'

import classes from './cart.module.scss'
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material";
import {useDispatch} from "react-redux";
import {fetchDeleteFromCart} from "../../../redux/userCartRedux/fetchUserCart";

function CartItem({product}) {
    const dispatch = useDispatch()
    function deleteFromCart() {
        dispatch(fetchDeleteFromCart(product.product_id))
        window.location.reload();
    }
    return (
        <div className={classes.productItem}>
            <img src={product.img_url || noopImg} alt="product_image" className={classes.productImg}/>
            <p className={classes.productTitle}>{product.product_title}</p>
            <p>{product.price} грн/уп</p>
            <span className={classes.productQuantity}>{product.quantity}</span>
            <span className={classes.productPriceForQuantity}>{product.price_for_quantity}</span>
            <IconButton
                aria-label="close"
                onClick={deleteFromCart}
            >
                <CloseIcon/>
            </IconButton>
        </div>
    );
}

export default CartItem;