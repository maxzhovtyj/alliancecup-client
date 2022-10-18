import {useState} from "react";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {IconButton, Paper} from "@mui/material";
import classes from './orderItem.module.scss'

function OrderItem({order}) {
    const [showDropdown, setShowDropdown] = useState(false)
    const {info, products, delivery} = order

    const toggleShowProduct = () => {
        setShowDropdown(prevState => !prevState)
    }
    const truncTimestamp = (createdAt) => {
        createdAt = createdAt.split(/[TZ]/g)
        let dotInd = createdAt[1].indexOf(".")
        createdAt[1] = createdAt[1].slice(0, dotInd)

        return createdAt.join(" ")
    }

    return (
        <Paper variant={"outlined"} className={classes.orderWrapper}>
            <div className={classes.orderInfo}>
                <div>
                    <p>{info.user_lastname} {info.user_firstname} {info.user_middle_name}</p>
                    <p className={classes.orderCreatedAt}>Від {truncTimestamp(info.created_at)}</p>
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
                                <div>{delivery.map((item, index) => <p key={index}>{item.delivery_description}</p>)}</div>
                            </div>
                            <p>{info.payment_type_title}</p>
                        </div>
                        <div className={classes.orderProducts}>
                            {products.map(p => p.product_title)}
                        </div>
                    </div>
                    : ""
            }
        </Paper>
    );
}

export default OrderItem;