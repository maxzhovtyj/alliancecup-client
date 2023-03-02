import {useState} from "react";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {IconButton, Paper} from "@mui/material";
import ItemImage from "../../../../../../UI/ItemImage";
import {NavLink} from "react-router-dom";

import {UserService} from "../../../../../../service/UserService";
import {OrderService} from "../../../../../../service/OrderService";

import classes from './orderItem.module.scss'

function OrderItem({order}) {
    const [showDropdown, setShowDropdown] = useState(false)
    const {info, products} = order

    const toggleShowProduct = () => {
        setShowDropdown(prevState => !prevState)
    }

    return (
        <Paper variant={"outlined"} className={classes.orderWrapper}>
            <div className={classes.orderInfo}>
                <div>
                    <p>{info.userLastname} {info.userFirstname} {info.userMiddleName}</p>
                    <p className={classes.orderCreatedAt}>Від {UserService.truncTimestamp(info.createdAt)}</p>
                </div>
                <div className={classes.orderSum}>
                    <p>Сума: {info.sumPrice} грн</p>
                    <IconButton onClick={toggleShowProduct}>
                        {showDropdown ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </div>
            </div>
            {
                showDropdown
                    ?
                    <div className={classes.dropdownWrapper}>
                        <div className={classes.orderDeliveryInfo}>
                            <p>Інформація про замовлення:</p>
                            <p>{info.userPhoneNumber}</p>
                            <p>{info.userEmail}</p>
                            <div>
                                <p>Доставка: {info.deliveryTypeTitle}</p>
                                {
                                    order?.info?.delivery
                                        ? OrderService.deliveryInfo(order?.info?.delivery)
                                        : ""
                                }
                            </div>
                            <p>{info.paymentTypeTitle}</p>
                        </div>
                        <div className={classes.orderProducts}>
                            {products.map(p =>
                                <div key={p.id} className={classes.orderProductItem}>
                                    <ItemImage item={p} alt={"product"}/>
                                    <div className={classes.orderProductInfo}>
                                        <NavLink to={`/product/${p.id}`}>
                                        <div className={classes.orderProductInfoItem}>
                                            <span>Товар</span>
                                            <p className={classes.productTitle}>{p.productTitle}</p>
                                        </div>
                                    </NavLink>
                                        <div className={classes.orderProductInfoItem}>
                                            <span>Кількість</span>
                                            <p>{p.quantity}</p>
                                        </div>
                                        <div className={classes.orderProductInfoItem}>
                                            <span>Сума</span>
                                            <p>{p.priceForQuantity} грн</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    : ""
            }
        </Paper>
    );
}

export default OrderItem;
