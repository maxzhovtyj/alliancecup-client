import classes from './cart.module.scss'

import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material";

import {NavLink} from "react-router-dom";
import {ShoppingService} from "../../../service/ShoppingService";

function CartItem({product, order}) {
    function deleteFromCart() {
        ShoppingService.deleteFromCart(product.id)
            .then(() => window.location.reload())
    }

    return (
        <div className={classes.productItem}>
            <NavLink to={`/product/${product.id}`} className={classes.productImg}>
                <img src={ShoppingService.getImage(product)} alt="product_image"/>
            </NavLink>
            <div className={classes.productInfo}>
                <NavLink to={`/product/${product.id}`}>
                    <p className={classes.productTitle}>{product.productTitle}</p>
                </NavLink>
                <p className={classes.productPrice}>{product.price} грн/уп</p>
                <p className={classes.productQuantity}>{product.quantity}</p>
                <p className={classes.productPriceForQuantity}>{product.priceForQuantity} грн</p>
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