import {AlliancePaper} from "../../../../UI/AlliancePaper";
import classes from "./adminProduct.module.scss";
import {Table, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AdminProductsTableBody from "./adminProductsTableBody";

function AdminProductsTableComponent({products, snackbar}) {
    return (
        <TableContainer component={AlliancePaper} className={classes.productsTable}>
            <Table sx={{minWidth: 200}}>
                <TableHead>
                    <TableRow>
                        <TableCell align={"center"}>Id</TableCell>
                        <TableCell align={"center"}>Категорія</TableCell>
                        <TableCell align="left">Назва</TableCell>
                        <TableCell align="center">Ціна</TableCell>
                        <TableCell align="center">Пакування</TableCell>
                        <TableCell align="center">Кількість</TableCell>
                        <TableCell align="center">Посилання на фотографію</TableCell>
                        <TableCell align="center">Номер у сховищі</TableCell>
                        <TableCell align="center">Активний</TableCell>
                        <TableCell align="center">Управління</TableCell>
                    </TableRow>
                </TableHead>
                <AdminProductsTableBody products={products} snackbar={snackbar}/>
            </Table>
        </TableContainer>
    );
}

export default AdminProductsTableComponent;