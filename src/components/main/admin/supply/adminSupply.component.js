import React, {useEffect} from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchMoreSupply, fetchSupply} from "../../../../redux/adminRedux/adminFetch";
import {ThemeProvider} from "@mui/material/styles";
import {muiTextBtnTheme} from "../../../../UI/styles";
import classes from "../../categories/products/products.module.scss";
import {NavLink} from "react-router-dom";

function AdminSupplyComponent(props) {
    const dispatch = useDispatch()
    const supply = useSelector(state => state.admin.supply)
    const loadMoreStatus = useSelector(state => state.admin.statusNoMoreSupply)
    useEffect(() => {
        dispatch(fetchSupply())
    }, [dispatch])

    const loadMore = () => {
        dispatch(fetchMoreSupply(supply[supply.length - 1].createdAt))
    }
    return (
        <div>
            <ThemeProvider theme={muiTextBtnTheme}>
                <NavLink to={"/user/admin/new-supply"}>
                    <div style={{display: "flex", justifyContent: "right", marginBottom: "2rem"}}>
                        <Button
                            className={classes.loadMoreBtn}
                            variant={"outlined"}
                            color="alliance"
                        >
                            Нове постачання
                        </Button>
                    </div>
                </NavLink>
            </ThemeProvider>
            <TableContainer component={Paper} sx={{margin: "2rem 0"}}>
                <Table sx={{minWidth: 200}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align="left">Постачальник</TableCell>
                            <TableCell align="center">Дата</TableCell>
                            <TableCell align="center">Сума</TableCell>
                            <TableCell align="center">Коментарій</TableCell>
                            <TableCell align="center">Створено</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (supply.length !== 0)
                                ?
                                supply.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align={"center"}>{row.id}</TableCell>
                                        <TableCell align={"left"}>{row.supplier}</TableCell>
                                        <TableCell align={"center"}>{row.supplyTime || "---"}</TableCell>
                                        <TableCell align={"center"}>{row.sum}</TableCell>
                                        <TableCell align="center">{row.comment || "---"}</TableCell>
                                        <TableCell align="center">{row.createdAt.split(/T|Z/g).join(" ")}</TableCell>
                                        {/*<TableCell align="center">*/}
                                        {/*    <ContextMenu item={row} setSnackbarMessage={setMessage} clickSnackbar={handleClick}/>*/}
                                        {/*</TableCell>*/}
                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell align="left">Постачань не знайдено</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                loadMoreStatus ? "" :
                    <ThemeProvider theme={muiTextBtnTheme}>
                        <div style={{display: "flex", justifyContent: "center", marginBottom: "2rem"}}>
                            <Button onClick={loadMore} className={classes.loadMoreBtn}
                                    variant={"text"}
                                    color="alliance">Завантажити ще</Button>
                        </div>
                    </ThemeProvider>
            }
        </div>
    );
}

export default AdminSupplyComponent;