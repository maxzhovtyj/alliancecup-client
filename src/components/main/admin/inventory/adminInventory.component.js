import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchInventories, fetchMoreInventories} from "../../../../redux/adminRedux/adminFetch";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import ContextMenuInventory from "../../../../UI/contextMenu/contextMenuInventory";

import classes from './inventory.module.scss'
import {NavLink} from "react-router-dom";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {UserService} from "../../../../service/UserService";

function AdminInventoryComponent() {
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

            <NavLink to={"/user/admin/new-inventory"}>
                <AllianceButton mb={"2rem"} align={"right"}>
                    Нова інвентаризація
                </AllianceButton>
            </NavLink>

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
                                        <TableCell align={"center"}>
                                            {UserService.truncTimestamp(row.created_at)}
                                        </TableCell>
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
                    <AllianceButton onClick={loadMoreInventories} mb={"2rem"}>
                        Завантажити ще
                    </AllianceButton>
                    : ""
            }
        </div>
    );
}

export default AdminInventoryComponent;