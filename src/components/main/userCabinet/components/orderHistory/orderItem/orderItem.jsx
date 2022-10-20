import {useState} from "react";

import noopImg from '../../../../../../assets/noopProduct.svg'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {IconButton, Paper} from "@mui/material";
import classes from './orderItem.module.scss'
import {UserService} from "../../../../../../service/UserService";
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
                                    delivery?.length
                                        ?
                                        <div>
                                            {delivery.map((item, index) =>
                                                <p key={index}>{item.deliveryDescription}</p>
                                            )}
                                        </div>
                                        : ""
                                }
                            </div>
                            <p>{info.paymentTypeTitle}</p>
                        </div>
                        <div className={classes.orderProducts}>
                            {products.map(p =>
                                <div key={p.id} className={classes.orderProductItem}>
                                    <img src={p.imgUrl || noopImg} alt="img"/>
                                    <NavLink to={`/product/${p.id}`}>
                                        <div className={classes.orderProductInfo}>
                                            <span>Товар</span>
                                            <p className={classes.productTitle}>{p.productTitle}</p>
                                        </div>
                                    </NavLink>
                                    <div className={classes.orderProductInfo}>
                                        <span>Кількість</span>
                                        <p>{p.quantity}</p>
                                    </div>
                                    <div className={classes.orderProductInfo}>
                                        <span>Сума</span>
                                        <p>{p.priceForQuantity} грн</p>
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