import {useContext} from 'react';
import noopImg from '../../../assets/noopProduct.svg'

import classes from './cart.module.scss'
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material";
import {AuthContext} from "../../../context/AuthContext";
import {NavLink} from "react-router-dom";
import {ShoppingService} from "../../../service/ShoppingService";

function CartItem({product, order}) {
    const {isAuth} = useContext(AuthContext)

    function deleteFromCart() {
        ShoppingService.deleteFromCart(isAuth, product.productId)
            .then(() => window.location.reload())
    }

    return (
        <div className={classes.productItem}>
            <NavLink to={`/product/${product.productId}`} className={classes.productImg}>
                <img src={product.imgUrl || noopImg} alt="product_image"/>
            </NavLink>
            <div className={classes.productInfo}>
                <NavLink to={`/product/${product.productId}`}>
                    <p className={classes.productTitle}>{product.productTitle}</p>
                </NavLink>
                <p className={classes.productPrice}>{product.price} грн/уп</p>
                <span className={classes.productQuantity}>{product.quantity}</span>
                <span className={classes.productPriceForQuantity}>{product.priceForQuantity} грн</span>
                {
                    order
                        ? ""
                        :
                        <IconButton
                            className={classes.deleteIconBtn}
                            aria-label="close"
                            onClick={deleteFromCart}
                        >
                            <CloseIcon/>
                        </IconButton>
                }
            </div>
        </div>
    );
}

export default CartItem;