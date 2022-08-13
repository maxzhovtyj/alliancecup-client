import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import classes from './products.module.scss'

function ProductItemComponent({product}) {
    let [amount, setAmount] = useState(1)
    let [priceAmount, setPriceAmount] = useState(product.price)

    function setProductAmount(e) {
        if (isNaN(e.target.value)) {
            e.target.value = 1
        }
        if (e.target.value === 0 || e.target.value === undefined || e.target.value === "") {
            setAmount(1)
            setPriceAmount(product.price)
        } else {
            setAmount(e.target.value)
            setPriceAmount(e.target.value * product.price)
        }
    }

    return (
        <div className={classes.productItem}>
            <Link to={`/product/${product.id}`}>
                <img className={classes.productImg} src={product.img_url} alt="img"/>
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
                    <div className={classes.buyInfo}>
                        <span className={classes.rightBorder}>{priceAmount}</span>
                        <button className={classes.buyBtn}>Купити</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItemComponent;