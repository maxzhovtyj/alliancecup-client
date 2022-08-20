import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, fetchMoreProducts, fetchProducts} from "../../../../redux/shopRedux/shopFetch";
import {Link, useParams} from "react-router-dom";

import ProductItemComponent from "./productItem.component";

import classes from './products.module.scss'
import {Button, TextField} from "@mui/material";
import SimpleSnackbar from "../../../../UI/snackbar";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import {muiBtnStyle, muiTextBtnTheme} from "../../../../UI/styles";
import {ThemeProvider} from "@mui/material/styles";

function ProductsComponent() {
    const dispatch = useDispatch()

    const categories = useSelector(state => state.shop.categories)
    const products = useSelector(state => state.shop.products)
    const cannotLoadMore = useSelector(state => state.shop.statusNoMoreProducts)

    let {open, setMessage, handleClick, message, handleClose} = useSnackbar()

    let [searchBar, setSearchBar] = useState("")
    const [searchParams, setSearchParams] = useState({
        id: useParams().id,
        price: [0, 200],
        size: "",
        characteristic: "",
        createdAt: "",
        search: "",
    })

    useEffect(() => {
        dispatch(fetchCategories())
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

    function search(e) {
        e.preventDefault()
        setSearchParams({...searchParams, search: searchBar})
    }

    function useSetCategoryId() {
        setSearchParams({...searchParams, id: useParams().id})
    }

    return (
        <div className={classes.productsPageWrapper}>
            <div className={classes.sidebar}>
                <div className={classes.catalog}>
                    {categories.map(item =>
                        <Link to={`/categories/${item.id}`} key={item.id} onClick={useSetCategoryId}>
                            {item.category_title}
                        </Link>)}
                </div>
            </div>
            <div className={classes.productsWrapper}>
                <form className={classes.searchBar}>
                    <TextField onChange={handleSearchBar} sx={muiBtnStyle} className={classes.searchBarInput}/>
                    <Button type={"submit"} onSubmit={search} onClick={search} variant={"text"}>Search</Button>
                </form>
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
                            {
                                cannotLoadMore
                                    ?
                                    ""
                                    :
                                    <ThemeProvider theme={muiTextBtnTheme}>
                                        <Button onClick={loadMore} className={classes.loadMoreBtn} variant={"text"}
                                                color="alliance">Завантажити ще</Button>
                                    </ThemeProvider>
                            }
                            <SimpleSnackbar open={open} message={message} handleClose={handleClose}/>
                        </div>
                }
            </div>
        </div>
    );
}

export default ProductsComponent;