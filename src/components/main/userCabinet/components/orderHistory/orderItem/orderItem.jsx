import classes from './orderItem.module.scss'

function OrderItem({order}) {
    const {info, products, delivery} = order

    // TODO drop down products and order info
    return (
        <div className={classes.orderWrapper}>
            <div className={classes.orderInfo}>
                <p>{info.user_lastname} {info.user_firstname} {info.user_middle_name}</p>
                <p>Доставка: {info.delivery_type_title}</p>
                <p>{info.payment_type_title}</p>
                <div>
                    {
                        delivery.map(item => <p>{item.delivery_title}: {item.delivery_description}</p>)
                    }
                </div>
            </div>
        </div>
    );
}

export default OrderItem;