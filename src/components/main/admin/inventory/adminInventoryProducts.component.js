import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchInventoryProducts} from "../../../../redux/adminRedux/adminFetch";
import {AlliancePaper} from "../../../../UI/AlliancePaper";

function AdminInventoryProductsComponent() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const products = useSelector(state => state.admin.products)

    useEffect(() => {
        dispatch(fetchInventoryProducts(id))
    }, [dispatch, id])

    return (
        <div>
            <p>Інвентаризація №{id}</p>
            <TableContainer component={AlliancePaper} sx={{margin: "2rem 0"}}>
                <Table sx={{minWidth: 200}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Товар</TableCell>
                            <TableCell align={"center"}>Ост. перевірка</TableCell>
                            <TableCell align={"center"}>Початк. залишок</TableCell>
                            <TableCell align={"center"}>Надходження</TableCell>
                            <TableCell align={"center"}>Витрати</TableCell>
                            <TableCell align={"center"}>Списання</TableCell>
                            <TableCell align={"center"}>Списання, грн</TableCell>
                            <TableCell align={"center"}>План. залишок</TableCell>
                            <TableCell align={"center"}>Факт. залишок</TableCell>
                            <TableCell align={"center"}>Факт. залишок, грн</TableCell>
                            <TableCell align={"center"}>Різниця</TableCell>
                            <TableCell align={"center"}>Різниця, грн</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            {
                                (products)
                                    ?
                                    products.map((row) => (
                                        <TableRow
                                            key={row.productId}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align={"center"}>{row.productId}</TableCell>
                                            <TableCell align={"center"}>{row.productTitle}</TableCell>
                                            <TableCell align={"center"}>{row.lastInventoryId || "---"}</TableCell>
                                            <TableCell align={"center"}>{row.initialAmount || "---"}</TableCell>
                                            <TableCell align={"center"}>{row.supply}</TableCell>
                                            <TableCell align={"center"}>{row.spends}</TableCell>
                                            <TableCell align={"center"}>{row.writeOff}</TableCell>
                                            <TableCell align={"center"}>{row.writeOffPrice}</TableCell>
                                            <TableCell align={"center"}>{row.plannedAmount}</TableCell>
                                            <TableCell align={"center"}>{row.realAmount}</TableCell>
                                            <TableCell align={"center"}>{row.realAmountPrice}</TableCell>
                                            <TableCell align={"center"}>{row.difference}</TableCell>
                                            <TableCell align={"center"}>{row.differencePrice}</TableCell>
                                        </TableRow>
                                    ))
                                    : <TableRow><TableCell align="left">Немає інвентаризацій</TableCell></TableRow>
                            }
                        </>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AdminInventoryProductsComponent;