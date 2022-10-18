import {useState} from "react";

import noopImg from '../../../../../../assets/noopProduct.svg'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {IconButton, Paper} from "@mui/material";
import classes from './orderItem.module.scss'
import {UserService} from "../../../../../../service/UserService";
import * as PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

function OrderItem({order}) {
    const [showDropdown, setShowDropdown] = useState(false)
    const {info, products, delivery} = order

    const toggleShowProduct = () => {
        setShowDropdown(prevState => !prevState)
    }

    return (
        <Paper variant={"outlined"} className={classes.orderWrapper}>
            <div className={classes.orderInfo}>
                <div>
                    <p>{info.user_lastname} {info.user_firstname} {info.user_middle_name}</p>
                    <p className={classes.orderCreatedAt}>Від {UserService.truncTimestamp(info.created_at)}</p>
                </div>
                <div className={classes.orderSum}>
                    <p>Сума: {info.sum_price} грн</p>
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
                            <p>{info.user_phone_number}</p>
                            <p>{info.user_email}</p>
                            <div>
                                <p>Доставка: {info.delivery_type_title}</p>
                                <div>{delivery.map((item, index) => <p
                                    key={index}>{item.delivery_description}</p>)}</div>
                            </div>
                            <p>{info.payment_type_title}</p>
                        </div>
                        <div className={classes.orderProducts}>
                            {products.map(p =>
                                <div key={p.id} className={classes.orderProductItem}>
                                    <img src={p.img_url || noopImg} alt="img"/>
                                    <NavLink to={`/product/${p.id}`}>
                                        <div className={classes.orderProductInfo}>
                                            <span>Товар</span>
                                            <p className={classes.productTitle}>{p.product_title}</p>
                                        </div>
                                    </NavLink>
                                    <div className={classes.orderProductInfo}>
                                        <span>Кількість</span>
                                        <p>{p.quantity}</p>
                                    </div>
                                    <div className={classes.orderProductInfo}>
                                        <span>Сума</span>
                                        <p>{p.price_for_quantity} грн</p>
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