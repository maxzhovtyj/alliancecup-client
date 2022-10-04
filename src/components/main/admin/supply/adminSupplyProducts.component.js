import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSupplyProducts} from "../../../../redux/adminRedux/adminFetch";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

function AdminSupplyProductsComponent(props) {
    const {id} = useParams()
    const dispatch = useDispatch()
    const products = useSelector(state => state.admin.supplyProducts)

    useEffect(() => {
        dispatch(fetchSupplyProducts(id))
    }, [dispatch, id])

    return (
        <div>
            <TableContainer component={Paper} sx={{margin: "2rem 0"}}>
                <Table sx={{minWidth: 200}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Товар</TableCell>
                            <TableCell align={"center"}>Фасування</TableCell>
                            <TableCell align={"center"}>Кількість</TableCell>
                            <TableCell align={"center"}>Ціна за од.</TableCell>
                            <TableCell align={"center"}>Сума без податку</TableCell>
                            <TableCell align={"center"}>Податок</TableCell>
                            <TableCell align={"center"}>Заг. сума</TableCell>
                            {/*<TableCell align={"center"}>Дії</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (products)
                                ?
                                products.map((row) => (
                                    <TableRow
                                        key={row.supplyId + row.productId}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align={"center"}>{row.productId}</TableCell>
                                        <TableCell align={"center"}>{row.productTitle}</TableCell>
                                        <TableCell align={"center"}>{row.packaging || "---"}</TableCell>
                                        <TableCell align={"center"}>{row.amount}</TableCell>
                                        <TableCell align={"center"}>{row.priceForUnit}</TableCell>
                                        <TableCell align={"center"}>{row.sumWithoutTax}</TableCell>
                                        <TableCell align={"center"}>{row.tax}</TableCell>
                                        <TableCell align={"center"}>{row.totalSum}</TableCell>
                                        {/*<TableCell align="center">*/}
                                        {/*    <ContextMenuInventory item={row}/>*/}
                                        {/*</TableCell>*/}
                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell align="left">Немає товарів</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AdminSupplyProductsComponent;