import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {fetchCategories, fetchMoreProducts, fetchProducts} from "../../../../redux/shopRedux/shopFetch";

import {
    FormControl,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import {AllianceInputLabel, AllianceSelect, AllianceTextField} from "../../../../UI/styles";
import SearchBar from "../../../../UI/searchBar/searchBar";
import AllianceSnackbar from "../../../../UI/snackbar";
import ContextMenuProduct from "./contextMenuProduct";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {AlliancePaper} from "../../../../UI/AlliancePaper";
import classes from "./adminProduct.module.scss";

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
        let lastCreatedAt = products[products.length - 1]?.createdAt
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
        <div className={classes.productsWrapper}>
            <FormControl sx={{marginBottom: "1rem", minWidth: 200}}>
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
                                {item.categoryTitle}
                            </MenuItem>)
                    }
                </AllianceSelect>
            </FormControl>

            <SearchBar value={searchBar} setValue={setSearchBar} onSearch={onSearch}/>

            <NavLink to={"/user/admin/new-product"}>
                <AllianceButton mt={"1rem"} mb={"1rem"}>Додати товар</AllianceButton>
            </NavLink>

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
                            <TableCell align="center">Управління</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            {
                                (products)
                                    ?
                                    products.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align={"center"}>{row.id}</TableCell>
                                            <TableCell align={"center"}>{row.categoryTitle}</TableCell>
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
                                            <TableCell align="center">
                                                <ContextMenuProduct
                                                    item={row}
                                                    setSnackbarMessage={setMessage}
                                                    clickSnackbar={handleClick}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : <TableRow><TableCell align="left">Немає товарів</TableCell></TableRow>
                            }
                        </>
                    </TableBody>
                </Table>
            </TableContainer>
            {
                cannotLoadMore ? "" :
                    <AllianceButton
                        onClick={loadMore}
                        align={"center"}
                        mb={"1rem"}
                        mt={"1rem"}
                        variant={"text"}
                    >
                        Завантажити ще
                    </AllianceButton>
            }
            <AllianceSnackbar open={open} message={message} handleClose={handleClose}/>
        </div>
    )
        ;
}

export default AdminProductsComponent;