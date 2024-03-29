import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchCategories, fetchMoreProducts, fetchProducts} from "../../../../redux/shopRedux/shopFetch";
import AdminProductsTableComponent from "./adminProductsTable.component";

import {
    FormControl,
    MenuItem,
} from "@mui/material";
import {AllianceInputLabel, AllianceSelect} from "../../../../UI/styles";
import SearchBar from "../../../../UI/searchBar/searchBar";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";

import classes from "./adminProduct.module.scss";
import {useSnackbarContext} from "../../../../context/SnackbarContext";

function AdminProductsComponent() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.shop.products)
    const categories = useSelector(state => state.shop.categories)
    const cannotLoadMore = useSelector(state => state.shop.statusNoMoreProducts)

    const navigate = useNavigate()
    const snackbar = useSnackbarContext()

    const [searchBar, setSearchBar] = useState("")
    const [searchParams, setSearchParams] = useState({
        id: "",
        createdAt: "",
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

    const navigateToAddNewProduct = () => {
        navigate("/user/admin/new-product")
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

            <AllianceButton onClick={navigateToAddNewProduct} mt={"1rem"} mb={"1rem"}>Додати товар</AllianceButton>

            <AdminProductsTableComponent products={products} snackbar={snackbar}/>

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
        </div>
    );
}

export default AdminProductsComponent;
