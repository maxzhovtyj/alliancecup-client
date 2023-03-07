import {OrderInfo} from "../../../UI/OrderInfo";

import classes from "./delivery.module.scss"

function DeliveryComponent() {
    return (
        <div className={classes.deliveryContainer}>
            <OrderInfo/>
            <div>
                <p>Графік доставки по м.Рівне:</p>
                <p>Вівторок, Четвер, Субота</p>
            </div>
        </div>
    );
}

export default DeliveryComponent;
