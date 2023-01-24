import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {AdminService} from "../../../../service/AdminService";

import classes from "./adminOrder.module.scss"
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AlliancePaper} from "../../../../UI/AlliancePaper";
import ContextMenuInventory from "../inventory/contextMenuInventory";
import {IN_PROGRESS, PROCESSED} from "./adminOrders.component";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import AllianceSnackbar from "../../../../UI/snackbar";

function adminDeliveryInfo(deliveryInfo, cls, valueCls) {
    return Object.entries(deliveryInfo).map(e => {
        const [key, value] = e;
        return (
            <div className={cls} key={key}>
                <p>{key}</p>
                <p className={valueCls}>{value}</p>
            </div>
        );
    })
}

function AdminOrderInfoComponent() {
    const {id} = useParams()

    const snackbar = useSnackbar()
    const [order, setOrder] = useState({
        info: {
            id: 0,
            executedBy: 0,
            userLastname: "",
            userFirstname: "",
            userMiddleName: "",
            userEmail: "",
            userPhoneNumber: "",
            status: "",
            sumPrice: "",
        },
        products: [],
    })

    useEffect(() => {
        AdminService.getOrderInfo(id).then(res => {
            setOrder(res.data)
        })
    }, [id])

    function processedOrder() {
        AdminService.processedOrder(order?.info?.id).then(res => {
            if (res?.status !== 200) {
                snackbar.setMessage(res?.message)
            } else window.location.reload()
        })
    }

    function completeOrder() {
        AdminService.completeOrder(order?.info?.id).then(res => {
            if (res?.status !== 200) {
                snackbar.setMessage(res?.message)
            } else window.location.reload()
        })
    }

    return (
        <div className={classes.orderPage}>
            <h1>Номер замовлення - {id}</h1>

            <div className={classes.orderPageInfo}>
                <p>Інформація</p>
                <div className={classes.orderPageInfoItem}>
                    <p>Виконано адміністратором</p>
                    <p className={classes.orderPageInfoItemValue}>{order.info?.executedBy || "ні"}</p>
                </div>
                <div className={classes.orderPageInfoItem}>
                    <p>Прізвище</p>
                    <p className={classes.orderPageInfoItemValue}>{order.info?.userLastname}</p>
                </div>
                <div className={classes.orderPageInfoItem}>
                    <p>Ім'я</p>
                    <p className={classes.orderPageInfoItemValue}>{order.info?.userFirstname}</p>
                </div>
                <div className={classes.orderPageInfoItem}>
                    <p>По-батькові</p>
                    <p className={classes.orderPageInfoItemValue}>{order.info?.userMiddleName}</p>
                </div>
                <div className={classes.orderPageInfoItem}>
                    <p>Email</p>
                    <p className={classes.orderPageInfoItemValue}>{order.info?.userEmail}</p>
                </div>
                <div className={classes.orderPageInfoItem}>
                    <p>Номер телефону</p>
                    <p className={classes.orderPageInfoItemValue}>{order.info?.userPhoneNumber}</p>
                </div>
                <div className={classes.orderPageInfoItem}>
                    <p>Доставка</p>
                    <p className={classes.orderPageInfoItemValue}>{order?.info?.deliveryTypeTitle}</p>
                </div>
                <div className={classes.orderPageInfoItem}>
                    <p>Оплата</p>
                    <p className={classes.orderPageInfoItemValue}>{order?.info?.paymentTypeTitle}</p>
                </div>
                {
                    order?.info?.delivery
                        ? adminDeliveryInfo(order?.info?.delivery, classes.orderPageInfoItem, classes.orderPageInfoItemValue)
                        : ""
                }
                <div className={classes.orderPageInfoItem}>
                    <p>Статус замовлення</p>
                    <p className={classes.orderPageInfoItemValue}>{order.info?.status}</p>
                </div>
                <div className={classes.orderPageInfoItem}>
                    <p>Сума</p>
                    <p className={classes.orderPageInfoItemValue}>{order.info?.sumPrice}</p>
                </div>
            </div>

            {
                order?.info?.status === IN_PROGRESS
                    ? <AllianceButton onClick={processedOrder} mt={"1rem"} mb={"1rem"}>Обробити
                        замовлення</AllianceButton>
                    : ""
            }

            {
                order?.info?.status === PROCESSED
                    ? <AllianceButton onClick={completeOrder} mt={"1rem"} mb={"1rem"}>Завершити
                        замовлення</AllianceButton>
                    : ""
            }

            <TableContainer component={AlliancePaper}>
                <Table sx={{minWidth: 200}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Артикул</TableCell>
                            <TableCell align={"center"}>Назва</TableCell>
                            <TableCell align={"center"}>Ціна</TableCell>
                            <TableCell align={"center"}>Кількість</TableCell>
                            <TableCell align={"center"}>На складі</TableCell>
                            <TableCell align={"center"}>Сума</TableCell>
                            <TableCell align={"center"}>Дії</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            {
                                (order?.products?.length)
                                    ?
                                    order?.products?.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align={"center"}>{row.id}</TableCell>
                                            <TableCell align={"center"}>{row.article}</TableCell>
                                            <TableCell align={"center"}>
                                                <NavLink to={`/product/${row.id}`}>{row.productTitle}</NavLink>
                                            </TableCell>
                                            <TableCell align={"center"}>{row.price}</TableCell>
                                            <TableCell align={"center"}>{row.quantity}</TableCell>
                                            <TableCell align={"center"}>{row.amountInStock}</TableCell>
                                            <TableCell align={"center"}>{row.priceForQuantity}</TableCell>
                                            <TableCell align="center">
                                                <ContextMenuInventory item={row}/>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : <TableRow><TableCell align="left">Немає інвентаризацій</TableCell></TableRow>
                            }
                        </>
                    </TableBody>
                </Table>
            </TableContainer>
            <AllianceSnackbar handleClose={snackbar.handleClose} message={snackbar.message} open={snackbar.open}/>
        </div>
    );
}

export default AdminOrderInfoComponent;