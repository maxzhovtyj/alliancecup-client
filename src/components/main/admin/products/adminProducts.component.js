import React, {useEffect, useState} from 'react';
import {
    Button, FormControl,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, fetchMoreProducts, fetchProducts} from "../../../../redux/shopRedux/shopFetch";
import {AllianceInputLabel, AllianceSelect, muiTextBtnTheme} from "../../../../UI/styles";
import classes from "../../categories/products/products.module.scss";
import {ThemeProvider} from "@mui/material/styles";
import SearchBar from "../../../../UI/searchBar/searchBar";
import ContextMenu from "../../../../UI/adminProductContextMenu/contextMenu";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import SimpleSnackbar from "../../../../UI/snackbar";

function AdminProductsComponent() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.shop.products)
    const categories = useSelector(state => state.shop.categories)
    const cannotLoadMore = useSelector(state => state.shop.statusNoMoreProducts)

    const {open, setMessage, message, handleClick, handleClose} = useSnackbar()

    const [searchBar, setSearchBar] = useState("")
    const [searchParams, setSearchParams] = useState({
        id: "",
        createdAt: "",
        price: [0, 100],
        size: "",
        characteristic: "",
        search: "",
    })

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchProducts(searchParams))
    }, [dispatch, searchParams])

    function loadMore() {
        let lastCreatedAt = products[products.length - 1]?.created_at
        dispatch(fetchMoreProducts({
            ...searchParams, createdAt: lastCreatedAt
        }))
    }

    function handleSearchParams(event) {
        setSearchParams({...searchParams, [event.target.name]: event.target.value})
    }

    function onSearch(event) {
        setSearchParams({...searchParams, search: searchBar})
        event.preventDefault()
    }

    return (
        <div>
            <FormControl sx={{marginBottom: "2rem", minWidth: 200}}>
                <AllianceInputLabel>Категорія</AllianceInputLabel>
                <AllianceSelect
                    defaultValue={""}
                    name="id"
                    label="Категорія"
                    value={searchParams.id}
                    onChange={handleSearchParams}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {
                        categories?.map(item =>
                            <MenuItem value={item.id} key={item.id}>
                                {item.category_title}
                            </MenuItem>)
                    }
                </AllianceSelect>
            </FormControl>

            <SearchBar value={searchBar} setValue={setSearchBar} onSearch={onSearch}/>

            <TableContainer component={Paper} sx={{margin: "2rem 0"}}>
                <Table sx={{minWidth: 200}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Категорія</TableCell>
                            <TableCell align="left">Назва</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Шт/уп</TableCell>
                            <TableCell align="center">Уп/ящ</TableCell>
                            <TableCell align="center">Кількість</TableCell>
                            <TableCell align="center">Управління</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (products)
                                ?
                                products.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align={"center"}>{row.id}</TableCell>
                                        <TableCell align={"center"}>{row.category_title}</TableCell>
                                        <TableCell component="th" scope="row">{row.product_title}</TableCell>
                                        <TableCell align="center">{row.price}</TableCell>
                                        <TableCell align="center">{row.units_in_package}</TableCell>
                                        <TableCell align="center">{row.packages_in_box}</TableCell>
                                        <TableCell align="center">{row.amount_in_stock}</TableCell>
                                        <TableCell align="center">
                                            <ContextMenu item={row} setSnackbarMessage={setMessage} clickSnackbar={handleClick}/>
                                        </TableCell>
                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell align="left">Немає товарів</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                cannotLoadMore ? "" :
                    <ThemeProvider theme={muiTextBtnTheme}>
                        <div style={{display: "flex", justifyContent: "center", marginBottom: "2rem"}}>
                            <Button onClick={loadMore} className={classes.loadMoreBtn}
                                    variant={"text"}
                                    color="alliance">Завантажити ще</Button>
                        </div>
                    </ThemeProvider>
            }
            <SimpleSnackbar open={open} message={message} handleClose={handleClose}/>
        </div>
    )
        ;
}

export default AdminProductsComponent;