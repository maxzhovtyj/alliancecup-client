import classes from './adminOrder.module.scss'
import OrderInfo from "../../orders/orderInfo";

function AdminNewOrderComponent() {
    return (
        <div>
            <p className={classes.pageTitle}>Нове замовлення</p>
            <div className={classes.newOrderInfoWrapper}>
                <OrderInfo/>
            </div>
        </div>
    );
}

export default AdminNewOrderComponent;