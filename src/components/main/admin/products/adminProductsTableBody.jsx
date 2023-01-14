import {TableBody, TableCell, TableRow} from "@mui/material";
import {AllianceTextField} from "../../../../UI/styles";
import ContextMenuProduct from "./contextMenuProduct";

function AdminProductsTableBody({products, snackbar}) {
    if (!products || products.length === 0) {
        return (
            <TableBody>
                <TableRow><TableCell align="left">Немає товарів</TableCell></TableRow>
            </TableBody>
        );
    }

    return (
        <TableBody>
            <>
                {
                    products.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align={"center"}>{row.id}</TableCell>
                            <TableCell align={"center"}>{row.categoryTitle || "---"}</TableCell>
                            <TableCell component="th" scope="row">{row.productTitle}</TableCell>
                            <TableCell align="center">{row.price}</TableCell>
                            <TableCell align="center">
                                <>
                                    {
                                        Object.entries(row.packaging).map(([key, value]) => {
                                            return <span key={key}>{value} {key} </span>;
                                        })
                                    }
                                </>
                            </TableCell>
                            <TableCell align="center">{row.amountInStock}</TableCell>
                            <TableCell align="center">
                                <AllianceTextField value={row.imgUrl || "---"}/>
                            </TableCell>
                            <TableCell align="center">{row.imgUUID || "---"}</TableCell>
                            <TableCell align="center">{row.isActive ? "Так" : "Ні"}</TableCell>
                            <TableCell align="center">
                                <ContextMenuProduct
                                    item={row}
                                    setSnackbarMessage={snackbar.setMessage}
                                    clickSnackbar={snackbar.handleClick}
                                />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </>
        </TableBody>
    );
}

export default AdminProductsTableBody;