import {useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {fetchSupplyProducts} from "../../../../redux/adminRedux/adminFetch";

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AlliancePaper} from "../../../../UI/AlliancePaper";

function AdminSupplyProductsComponent() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const products = useSelector(state => state.admin.supplyProducts)

    useEffect(() => {
        dispatch(fetchSupplyProducts(id))
    }, [dispatch, id])


    return (
        <div>
            <TableContainer component={AlliancePaper} sx={{margin: "2rem 0"}}>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            {
                                (products?.length)
                                    ?
                                    products.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align={"center"}>{row.productId}</TableCell>
                                            <TableCell align={"center"}>
                                                <NavLink to={`/product/${row.productId}`}>
                                                    {row.productTitle}
                                                </NavLink>
                                            </TableCell>
                                            <TableCell align={"center"}>{row.packaging || "---"}</TableCell>
                                            <TableCell align={"center"}>{row.amount}</TableCell>
                                            <TableCell align={"center"}>{row.priceForUnit}</TableCell>
                                            <TableCell align={"center"}>{row.sumWithoutTax}</TableCell>
                                            <TableCell align={"center"}>{row.tax}</TableCell>
                                            <TableCell align={"center"}>{row.totalSum}</TableCell>
                                        </TableRow>
                                    ))
                                    :
                                    <TableRow>
                                        <TableCell align="left">Немає товарів</TableCell>
                                    </TableRow>
                            }
                        </>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AdminSupplyProductsComponent;