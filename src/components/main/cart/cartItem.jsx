import {useNavigate} from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material";

import {ShoppingService} from "../../../service/ShoppingService";

import ItemImage from "../../../UI/ItemImage";

import classes from './cart.module.scss'

function CartItem({product, order}) {
    const navigate = useNavigate()

    function handleNavigate() {
        navigate(`/product/${product.id}`)
    }

    function deleteFromCart() {
        ShoppingService.deleteFromCart(product.id)
            .then(() => window.location.reload())
    }

    return (
        <div className={classes.productItem} onClick={handleNavigate}>
            <ItemImage item={product} alt={"product"} cls={classes.productImg}/>
            <div className={classes.productInfo}>
                <p className={classes.productTitle}>{product.productTitle}</p>
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
