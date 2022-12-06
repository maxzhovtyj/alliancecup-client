import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {fetchMoreOrders, fetchOrders} from "../../../../redux/adminRedux/adminFetch";

import ContextMenuOrders from "../../../../UI/contextMenu/contextMenuOrders";
import {
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {AllianceInputLabel, AllianceSelect} from "../../../../UI/styles";
import SearchBar from "../../../../UI/searchBar/searchBar";
import {NavLink} from "react-router-dom";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {UserService} from "../../../../service/UserService";
import {AlliancePaper} from "../../../../UI/AlliancePaper";
import {AdminService} from "../../../../service/AdminService";

import classes from "./adminOrder.module.scss"

export const IN_PROGRESS = "IN_PROGRESS"
export const PROCESSED = "PROCESSED"
export const COMPLETED = "COMPLETED"

function AdminOrdersComponent() {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.admin.orders)
    const canLoad = useSelector(state => state.admin.statusNoMoreOrders)

    const [orderStatus, setOrderStatus] = useState("")
    const [searchOrders, setSearchOrders] = useState("")
    const [searchBar, setSearchBar] = useState("")

    useEffect(() => {
        dispatch(fetchOrders("", orderStatus, searchOrders))
    }, [dispatch, orderStatus, searchOrders])

    const downloadInvoice = (orderId) => {
        AdminService.getInvoice(orderId).then(res => {
            const file = new Blob([res.data], {type: 'application/pdf'});

            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = `invoice-${orderId}.pdf`;
            link.click();
        })
    }

    const handleOrderStatus = (event) => {
        setOrderStatus(event.target.value)
    }

    const handleOnSearch = (event) => {
        event.preventDefault()
        setSearchOrders(searchBar)
    }

    const loadMoreOrders = () => {
        const lastOrderCreatedAt = orders[orders.length - 1].createdAt
        dispatch(fetchMoreOrders(lastOrderCreatedAt, orderStatus, searchOrders))
    }

    const getStatusBorder = (status) => {
        if (status === IN_PROGRESS) {
            return classes.borderStyleRed
        }
        if (status === PROCESSED) {
            return classes.borderStyleYellow
        }
        if (status === COMPLETED) {
            return classes.borderStyleGreen
        }
    }

    return (
        <div>
            <p>Замовлення</p>
            <Box sx={{maxWidth: 300, marginTop: 2, marginBottom: 2}}>
                <FormControl fullWidth>
                    <AllianceInputLabel id="status-select">Статус</AllianceInputLabel>
                    <AllianceSelect
                        label={"Статус"}
                        labelId={"status-select"}
                        id="demo-status-select"
                        value={orderStatus}
                        onChange={handleOrderStatus}
                    >

                        <MenuItem value={IN_PROGRESS}>Надійшли</MenuItem>
                        <MenuItem value={PROCESSED}>Оброблено</MenuItem>
                        <MenuItem value={COMPLETED}>Завершено</MenuItem>
                    </AllianceSelect>
                </FormControl>
            </Box>

            <SearchBar value={searchBar} setValue={setSearchBar} onSearch={handleOnSearch}/>

            <NavLink to={"/user/admin/new-order"}>
                <AllianceButton mb={"1rem"} mt={"1rem"}>
                    Нове замовлення
                </AllianceButton>
            </NavLink>

            <TableContainer component={AlliancePaper} sx={{marginBottom: "2rem"}}>
                <Table sx={{minWidth: 200}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Статус</TableCell>
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
                        <>
                            {(orders?.length)
                                ?
                                orders.map((row) => {
                                    return (
                                        <TableRow
                                            key={row.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align={"center"} className={getStatusBorder(row.status)}>
                                                {row.id}
                                            </TableCell>
                                            <TableCell align={"center"}>{row.status}</TableCell>
                                            <TableCell align={"center"}>
                                                {[row.userLastname, row.userFirstname, row.userMiddleName].join(" ")}
                                            </TableCell>
                                            <TableCell align={"center"}>{row.userPhoneNumber}</TableCell>
                                            <TableCell align={"center"}>{row.sumPrice} грн</TableCell>
                                            <TableCell align={"center"}>{row.deliveryTypeTitle}</TableCell>
                                            <TableCell align={"center"}>{row.paymentTypeTitle}</TableCell>
                                            <TableCell align={"center"}>
                                                {UserService.truncTimestamp(row.createdAt)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <ContextMenuOrders item={row} downloadInvoice={downloadInvoice}/>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                : <TableRow><TableCell align="center">Немає замовлень</TableCell></TableRow>
                            }
                        </>
                    </TableBody>
                </Table>
            </TableContainer>

            {
                !canLoad
                    ?
                    <AllianceButton onClick={loadMoreOrders} mb={"2rem"}>
                        Завантажити ще
                    </AllianceButton>
                    : ""
            }
        </div>
    );
}

export default AdminOrdersComponent;