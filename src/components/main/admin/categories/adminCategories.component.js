import {useEffect} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AlliancePaper} from "../../../../UI/AlliancePaper";
import AllianceSnackbar from "../../../../UI/snackbar";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, fetchFiltrationItems} from "../../../../redux/shopRedux/shopFetch";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import ContextMenuCategory from "./contextMenuCategory";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {useNavigate} from "react-router-dom";
import {AllianceTextField} from "../../../../UI/styles";
import ContextMenuFiltrationItem from "./contextMenuFiltrationItem";

function AdminCategoriesComponent() {
    const snackbar = useSnackbar()
    const navigate = useNavigate()


    const dispatch = useDispatch()
    const categories = useSelector(state => state.shop.categories)
    const filtrationList = useSelector(state => state.shop.filtrationList)

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchFiltrationItems())
    }, [dispatch])

    const navigateToNewFiltration = () => {
        navigate("/user/admin/new-filtration")
    }

    const navigateToNewCategory = () => {
        navigate("/user/admin/new-category")
    }

    return (
        <div>
            <AllianceButton onClick={navigateToNewCategory} mt={"1rem"} mb={"1rem"}>
                Додати категорію
            </AllianceButton>
            <TableContainer component={AlliancePaper}>
                <Table sx={{minWidth: 200}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Категорія</TableCell>
                            <TableCell align={"center"}>URL Фотографії</TableCell>
                            <TableCell align={"center"}>Номер фотографії в сховищі</TableCell>
                            <TableCell align={"center"}>Управління</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            {
                                (categories?.length)
                                    ?
                                    categories.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align={"center"}>{row.id}</TableCell>
                                            <TableCell align={"center"}>{row.categoryTitle}</TableCell>
                                            <TableCell align={"center"}>
                                                <AllianceTextField value={row.imgUrl || "---"}/>
                                            </TableCell>
                                            <TableCell align={"center"}>{row.imgUUID || "---"}</TableCell>
                                            <TableCell align={"center"}>
                                                <ContextMenuCategory
                                                    item={row}
                                                    setMessage={snackbar.setMessage}
                                                    handleClickSnackbar={snackbar.handleClick}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : <TableRow><TableCell align="left">Немає категорій</TableCell></TableRow>
                            }
                        </>
                    </TableBody>
                </Table>
            </TableContainer>

            <AllianceButton onClick={navigateToNewFiltration} mt={"1rem"} mb={"1rem"}>
                Додати пошукову фільтрацію
            </AllianceButton>

            <TableContainer component={AlliancePaper}>
                <Table sx={{minWidth: 200}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Id категорії</TableCell>
                            <TableCell align={"center"}>Id підкатегорії</TableCell>
                            <TableCell align={"center"}>Назва</TableCell>
                            <TableCell align={"center"}>Пошуковий ключ</TableCell>
                            <TableCell align={"center"}>Пошукове значення</TableCell>
                            <TableCell align={"center"}>Url фотографії</TableCell>
                            <TableCell align={"center"}>Номер у сховищі</TableCell>
                            <TableCell align={"center"}>Дії</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            {
                                (filtrationList?.length)
                                    ?
                                    filtrationList.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align={"center"}>{row.id}</TableCell>
                                            <TableCell align={"center"}>{row.categoryId || "---"}</TableCell>
                                            <TableCell align={"center"}>{row.filtrationListId || "---"}</TableCell>
                                            <TableCell align={"center"}>{row.filtrationTitle}</TableCell>
                                            <TableCell align={"center"}>{row.searchKey}</TableCell>
                                            <TableCell align={"center"}>{row.searchCharacteristic}</TableCell>
                                            <TableCell align={"center"}>
                                                <AllianceTextField value={row.imgUrl || "---"}/>
                                            </TableCell>
                                            <TableCell align={"center"}>{row.imgUUID || "---"}</TableCell>
                                            <TableCell align={"center"}>
                                                <ContextMenuFiltrationItem
                                                    item={row}
                                                    setMessage={snackbar.setMessage}
                                                    handleClickSnackBar={snackbar.handleClick}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    :
                                    <TableRow><TableCell align="left">
                                        Немає пошукових фільтрацій
                                    </TableCell></TableRow>
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