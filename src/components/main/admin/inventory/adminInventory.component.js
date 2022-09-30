import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchInventories, fetchMoreInventories} from "../../../../redux/adminRedux/adminFetch";
import {muiTextBtnTheme} from "../../../../UI/styles";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import ContextMenuInventory from "../../../../UI/contextMenu/contextMenuInventory";

import classes from './inventory.module.scss'
import {NavLink} from "react-router-dom";

function AdminInventoryComponent(props) {
    const dispatch = useDispatch()
    const inventories = useSelector(state => state.admin.inventories)
    const canLoad = useSelector(state => state.admin.statusNoMoreInventories)

    useEffect(() => {
        dispatch(fetchInventories(""))
    }, [dispatch])

    const loadMoreInventories = () => {
        const lastInventoryCreatedAt = inventories[inventories.length - 1].createdAt
        dispatch(fetchMoreInventories(lastInventoryCreatedAt))
    }
    return (
        <div>
            <p className={classes.inventoryTitle}>
                Інвентаризації
            </p>
            <ThemeProvider theme={muiTextBtnTheme}>
                <NavLink to={"/user/admin/new-inventory"}>
                    <div style={{display: "flex", justifyContent: "right", marginBottom: "2rem"}}>
                        <Button
                            variant={"outlined"}
                            color="alliance"
                        >
                            Нова інвентаризація
                        </Button>
                    </div>
                </NavLink>
            </ThemeProvider>
            <TableContainer component={Paper} sx={{margin: "2rem 0"}}>
                <Table sx={{minWidth: 200}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Створено</TableCell>
                            <TableCell align={"center"}>Дії</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (inventories)
                                ?
                                inventories.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align={"center"}>{row.id}</TableCell>
                                        <TableCell align={"center"}>{row.createdAt.split(/T|Z/g).join(" ")}</TableCell>
                                        <TableCell align="center">
                                            <ContextMenuInventory item={row}/>
                                        </TableCell>
                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell align="left">Немає інвентаризацій</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                !canLoad
                    ?
                    <ThemeProvider theme={muiTextBtnTheme}>
                        <div style={{display: "flex", justifyContent: "left", marginBottom: "2rem"}}>
                            <Button onClick={loadMoreInventories}
                                    variant={"outlined"}
                                    color="alliance">Завантажити ще</Button>
                        </div>
                    </ThemeProvider>
                    : ""
            }
        </div>
    );
}

export default AdminInventoryComponent;