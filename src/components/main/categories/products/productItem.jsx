import {useState} from 'react';
import {Link} from 'react-router-dom'
import classes from './products.module.scss'

import noopImg from '../../../../assets/noopProduct.svg'

import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material";
import {ShoppingService} from "../../../../service/ShoppingService";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";

function ProductItem({product, setMessage, handleClick, deleteFavourite}) {
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
            ...product,
            quantity: Number(amount),
            priceForQuantity: priceAmount,
            price: product.price,
        }


        ShoppingService.addToCart(addToCartProduct).then(res => {
            setMessage(res.message)
            handleClick()
        })
    }

    function addToFavourites() {
        ShoppingService.addToFavourites(product).then(res => {
            setMessage(res.message)
            handleClick()
        })
    }

    function deleteFromFavourites() {
        ShoppingService.deleteFromFavourites(product.id).then(() => {
            window.location.reload()
        })
    }

    const getProductImage = () => {
        if (product.imgUUID) {
            return `http://localhost:9000/images/${product?.imgUUID}`
        } else if (product.imgUrl) {
            return product.imgUrl
        } else return noopImg
    }

    return (
        <div className={classes.productItem}>
            <Link to={`/product/${product.id}`}>
                <img className={classes.productImg} src={getProductImage()} alt={"img"}/>
            </Link>
            <div className={classes.productInfoWrapper}>
                <Link to={`/product/${product.id}`}>
                    <p className={classes.productTitle}>{product.productTitle}</p>
                </Link>

                <div className={classes.productInfo}>
                    <div className={classes.stockInfo}>
                        {
                            product.packaging
                                ?
                                Object.entries(product.packaging).map(entry => {
                                    const [key, value] = entry
                                    return <span key={key}>{value} {key}</span>
                                })
                                : ""
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

export default ProductItem;