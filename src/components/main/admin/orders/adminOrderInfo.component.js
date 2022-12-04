import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {AdminService} from "../../../../service/AdminService";

import classes from "./adminOrder.module.scss"

function AdminOrderInfoComponent() {
    const {id} = useParams()

    const [order, setOrder] = useState({})

    useEffect(() => {
        AdminService.getOrderInfo(id).then(res => {
            setOrder(res.data)
        })
    }, [id])

    return (
        <div className={classes.orderPage}>
            <h1>Номер замовлення - {id}</h1>

            <div className={classes.orderPageInfo}>
                <p>Інформація</p>
                <p>Виконано адміністратором - {order.info?.executedBy || "ні"}</p>
                <p>Прізвище - {order.info?.userLastname}</p>
                <p>Ім'я - {order.info?.userFirstname}</p>
                <p>По-батькові - {order.info?.userMiddleName}</p>
                <p>Email - {order.info?.userEmail}</p>
                <p>Номер телефону {order.info?.userPhoneNumber}</p>
                <p>Статус замовлення - {order.info?.status}</p>
                <p>Сума - {order.info?.sumPrice} грн</p>
            </div>

            <div>

            </div>
        </div>
    );
}

export default AdminOrderInfoComponent;