import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useSnackbarContext} from "../../../../context/SnackbarContext";

import {fetchMoreSupply, fetchSupply} from "../../../../redux/adminRedux/adminFetch";
import {NavLink} from "react-router-dom";

import ContextMenuSupply from "./contextMenuSupply";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {AlliancePaper} from "../../../../UI/AlliancePaper";

import {UserService} from "../../../../service/UserService";

function AdminSupplyComponent() {
    const dispatch = useDispatch()
    const supply = useSelector(state => state.admin.supply)
    const loadMoreStatus = useSelector(state => state.admin.statusNoMoreSupply)
    const snackbar = useSnackbarContext()

    useEffect(() => {
        dispatch(fetchSupply())
    }, [dispatch])

    const loadMore = () => {
        dispatch(fetchMoreSupply(supply[supply.length - 1].createdAt))
    }

    return (
        <div>
            <NavLink to={"/user/admin/new-supply"}>
                <AllianceButton mb={"2rem"}>
                    Нове постачання
                </AllianceButton>
            </NavLink>
            <TableContainer component={AlliancePaper} sx={{margin: "2rem 0"}}>
                <Table sx={{minWidth: 200}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align="left">Постачальник</TableCell>
                            <TableCell align="center">Дата</TableCell>
                            <TableCell align="center">Сума</TableCell>
                            <TableCell align="center">Коментарій</TableCell>
                            <TableCell align="center">Створено</TableCell>
                            <TableCell align="center">Дії</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>{
                            (supply.length !== 0)
                                ?
                                supply.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align={"center"}>{row.id}</TableCell>
                                        <TableCell align={"left"}>{row.supplier}</TableCell>
                                        <TableCell align={"center"}>
                                            {UserService.truncTimestamp(row.supplyTime)}
                                        </TableCell>
                                        <TableCell align={"center"}>{row.sum}</TableCell>
                                        <TableCell align="center">{row.comment || "---"}</TableCell>
                                        <TableCell align="center">
                                            {UserService.truncTimestamp(row.createdAt)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <ContextMenuSupply item={row} snackbar={snackbar}/>
                                        </TableCell>
                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell align="left">Постачань не знайдено</TableCell>
                                </TableRow>
                        }</>
                    </TableBody>
                </Table>
            </TableContainer>

            {
                loadMoreStatus ? "" :
                    <AllianceButton onClick={loadMore} mb={"2rem"}>
                        Завантажити ще
                    </AllianceButton>
            }
        </div>
    );
}

export default AdminSupplyComponent;
