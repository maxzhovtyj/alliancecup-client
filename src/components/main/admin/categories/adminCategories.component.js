import {useEffect} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AlliancePaper} from "../../../../UI/AlliancePaper";
import AllianceSnackbar from "../../../../UI/snackbar";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../../../redux/shopRedux/shopFetch";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import ContextMenuCategory from "../../../../UI/contextMenu/contextMenuCategory";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {NavLink} from "react-router-dom";

function AdminCategoriesComponent() {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.shop.categories)

    const snackbar = useSnackbar()
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])
    return (
        <div>
            <NavLink to={"/user/admin/new-category"}>
                <AllianceButton mt={"1rem"} mb={"1rem"}>Додати категорію</AllianceButton>
            </NavLink>
            <TableContainer component={AlliancePaper}>
                <Table sx={{minWidth: 200}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Категорія</TableCell>
                            <TableCell align={"center"}>URL Фотографії</TableCell>
                            <TableCell align={"center"}>Номер фотографії в сховищі</TableCell>
                            <TableCell align={"center"}>Опис</TableCell>
                            <TableCell align={"center"}>Управління</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            {
                                (categories)
                                    ?
                                    categories.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align={"center"}>{row.id}</TableCell>
                                            <TableCell align={"center"}>{row.categoryTitle}</TableCell>
                                            <TableCell align={"center"}>{row.imgUrl || "---"}</TableCell>
                                            <TableCell align={"center"}>{row.imgUUID || "---"}</TableCell>
                                            <TableCell align={"center"}>{row.description || "---"}</TableCell>
                                            <TableCell align={"center"}>
                                                <ContextMenuCategory item={row}/>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : <TableRow><TableCell align="left">Немає товарів</TableCell></TableRow>
                            }
                        </>
                    </TableBody>
                </Table>
            </TableContainer>
            <AllianceSnackbar open={snackbar.open} message={snackbar.message} handleClose={snackbar.handleClose}/>
        </div>
    );
}

export default AdminCategoriesComponent;