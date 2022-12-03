import {useDispatch, useSelector} from "react-redux";
import {fetchModerators, fetchMoreModerators} from "../../../../redux/adminRedux/adminFetch";
import {useEffect} from "react";
import classes from "../inventory/inventory.module.scss";
import {NavLink} from "react-router-dom";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AlliancePaper} from "../../../../UI/AlliancePaper";
import {UserService} from "../../../../service/UserService";
import ContextMenuInventory from "../../../../UI/contextMenu/contextMenuInventory";

function AdminModeratorsComponent() {
    const dispatch = useDispatch()
    const moderators = useSelector(state => state.admin.moderators)
    const canLoad = useSelector(state => state.admin.statusNoMoreModerators)

    useEffect(() => {
        dispatch(fetchModerators(""))
    }, [dispatch])

    const loadMoreModerators = () => {
        const lastModeratorCreatedAt = moderators[moderators.length - 1].createdAt
        dispatch(fetchMoreModerators(lastModeratorCreatedAt))
    }

    return (
        <div>
            <p className={classes.inventoryTitle}>
                Модератори
            </p>

            <NavLink to={"/user/admin/new-moderator"}>
                <AllianceButton mb={"1rem"} mt={"1rem"} align={"right"}>
                    Створити модератора
                </AllianceButton>
            </NavLink>

            <TableContainer component={AlliancePaper}>
                <Table sx={{minWidth: 200}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Email</TableCell>
                            <TableCell align={"center"}>Ім'я</TableCell>
                            <TableCell align={"center"}>Номер телефону</TableCell>
                            <TableCell align={"center"}>Дії</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            {
                                (moderators?.length)
                                    ?
                                    moderators.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align={"center"}>{row.id}</TableCell>
                                            <TableCell align={"center"}>{row.email}</TableCell>
                                            <TableCell align={"center"}>
                                                {[row.lastname, row.firstname, row.middleName].join(" ")}
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                {row.phoneNumber}
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                {UserService.truncTimestamp(row.createdAt)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <ContextMenuInventory item={row}/>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : <TableRow><TableCell align="left">Немає модераторів</TableCell></TableRow>
                            }
                        </>
                    </TableBody>
                </Table>
            </TableContainer>
            {
                !canLoad
                    ?
                    <AllianceButton onClick={loadMoreModerators} mb={"2rem"}>
                        Завантажити ще
                    </AllianceButton>
                    : ""
            }
        </div>
    );
}

export default AdminModeratorsComponent;