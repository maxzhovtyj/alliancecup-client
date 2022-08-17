import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMoreProducts, fetchProducts} from "../../../../redux/categoriesRedux/categoriesFetch";
import {useParams} from "react-router-dom";
import ProductItemComponent from "./productItem.component";

import classes from './products.module.scss'
import {Button, TextField} from "@mui/material";
import SimpleSnackbar from "../../../../UI/snackbar";
import {useSnackbar} from "../../../../hooks/useSnackbar";

const style = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        "&.Mui-focused fieldset": {
            borderWidth: "1px",
            borderColor: "#F7A500"
        }
    }
}


function ProductsComponent() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const products = useSelector(state => state.categories.products)
    let {open, setMessage, handleClick, message, handleClose} = useSnackbar()

    let [searchBar, setSearchBar] = useState("")
    const [searchParams, setSearchParams] = useState({
        id: id,
        leftPrice: "0",
        rightPrice: "100",
        size: "",
        characteristic: "",
        createdAt: "",
        search: "",
    })

    useEffect(() => {
        dispatch(fetchProducts(searchParams))
    }, [dispatch, searchParams])

    function loadMore() {
        let lastCreatedAt = products[products.length - 1].created_at
        dispatch(fetchMoreProducts({
            ...searchParams, createdAt: lastCreatedAt
        }))
    }

    function handleSearchBar(event) {
        setSearchBar(event.target.value)
    }

    function search() {
        setSearchParams({...searchParams, search: searchBar})
    }

    return (
        <div className={classes.productsPageWrapper}>
            <div className={classes.sidebar}>sidebar</div>
            <div className={classes.productsWrapper}>
                <div className={classes.searchBar}>
                    <TextField onChange={handleSearchBar} sx={style} className={classes.searchBarInput}/>
                    <Button onClick={search} variant={"text"}>Search</Button>
                </div>
                {
                    !products
                        ?
                        <div className={classes.productsList}>Товарів не знайдено</div>
                        :
                        <div>
                            <div className={classes.productsList}>
                                {products.map(
                                    item => <ProductItemComponent
                                        product={item}
                                        setMessage={setMessage}
                                        handleClick={handleClick}
                                        key={item.article}
                                    />)}
                            </div>
                            <Button onClick={loadMore} variant={"outlined"}>Load More</Button>
                            <SimpleSnackbar open={open} message={message} handleClose={handleClose}/>
                        </div>
                }
            </div>
        </div>
    );
}

export default ProductsComponent;