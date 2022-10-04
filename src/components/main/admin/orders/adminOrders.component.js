import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {fetchOrders} from "../../../../redux/adminRedux/adminFetch";

import ContextMenuOrders from "../../../../UI/contextMenu/contextMenuOrders";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

import {API_URL} from "../../../../http/http";

const $fileApi = axios.create({
    responseType: "arraybuffer",
    withCredentials: true,
    baseURL: API_URL,
})

const IN_PROGRESS = "IN_PROGRESS"
const PROCESSED = "PROCESSED"
const COMPLETED = "COMPLETED"

function AdminOrdersComponent(props) {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.admin.orders)
    const [orderStatus, setOrderStatus] = useState(PROCESSED)

    useEffect(() => {
        dispatch(fetchOrders("", orderStatus))
    }, [dispatch, orderStatus])

    const getInvoice = async () => {
        try {
            return await $fileApi.get("/api/invoice?id=92d078c7-8730-48af-9124-4d528112ebe0")
        } catch (e) {
            console.log(e)
        }
    }

    const downloadInvoice = () => {
        getInvoice().then(res => {
            const file = new Blob([res.data], {type: 'application/pdf'});

            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = "invoice.pdf";
            link.click();
        })
    }

    return (
        <div>
            <p>Orders</p>
            <Button variant={"outlined"} onClick={downloadInvoice}>Download</Button>
            <TableContainer component={Paper} sx={{margin: "2rem 0"}}>
                <Table sx={{minWidth: 200}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Замовник</TableCell>
                            <TableCell align={"center"}>Номер телефону</TableCell>
                            <TableCell align={"center"}>Сума</TableCell>
                            <TableCell align={"center"}>Доставка</TableCell>
                            <TableCell align={"center"}>Оплата</TableCell>
                            <TableCell align={"center"}>Створено</TableCell>
                            <TableCell align={"center"}>Дії</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (orders?.length)
                                ?
                                orders.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align={"center"}>{row.id}</TableCell>
                                        <TableCell align={"center"}>
                                            {[row.user_lastname, row.user_firstname, row.user_middle_name].join(" ")}
                                        </TableCell>
                                        <TableCell align={"center"}>{row.user_phone_number}</TableCell>
                                        <TableCell align={"center"}>{row.order_sum_price} грн</TableCell>
                                        <TableCell align={"center"}>{row.delivery_type_title}</TableCell>
                                        <TableCell align={"center"}>{row.payment_type_title}</TableCell>
                                        <TableCell align={"center"}>{row.created_at.split(/T|Z/g).join(" ")}</TableCell>
                                        <TableCell align="center">
                                            <ContextMenuOrders item={row}/>
                                        </TableCell>
                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell align="left">Немає замовлень</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AdminOrdersComponent;