import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCategories,
    fetchFiltrationList,
    fetchMoreProducts,
    fetchProducts
} from "../../../../redux/shopRedux/shopFetch";
import {Link, useParams} from "react-router-dom";

import ProductItemComponent from "./productItem.component";

import classes from './products.module.scss'
import {Button} from "@mui/material";
import SimpleSnackbar from "../../../../UI/snackbar";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import {muiTextBtnTheme} from "../../../../UI/styles";
import {ThemeProvider} from "@mui/material/styles";
import RangeSlider from "../../../../UI/rangeSlider/rangeSlider";
import FiltrationItem from "../filtrationItem/filtrationItem";

function ProductsComponent() {
    const dispatch = useDispatch()

    const categories = useSelector(state => state.shop.categories)
    const products = useSelector(state => state.shop.products)
    const cannotLoadMore = useSelector(state => state.shop.statusNoMoreProducts)
    const filtrationList = useSelector(state => state.shop.filtrationList)

    let {open, setMessage, handleClick, message, handleClose} = useSnackbar()

    let [filtrationParent, setFiltrationParent] = useState({
        parentName: "category_id",
        id: useParams().id
    })

    const [rangePrice, setRangePrice] = useState([0, 100])
    const [searchParams, setSearchParams] = useState({
        id: useParams().id,
        price: [0, 100],
        size: "",
        characteristic: "",
        createdAt: "",
        search: "",
    })


    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchProducts(searchParams))
    }, [dispatch, searchParams])

    useEffect(() => {
        dispatch(fetchFiltrationList(filtrationParent.parentName, filtrationParent.id))
    }, [dispatch, filtrationParent.id, filtrationParent.parentName])

    function loadMore() {
        let lastCreatedAt = products[products.length - 1].created_at
        dispatch(fetchMoreProducts({
            ...searchParams, createdAt: lastCreatedAt
        }))
    }

    function useSetCategoryId() {
        setSearchParams({...searchParams, id: useParams().id})
    }

    function handleCharacteristic(filtration, id) {
        setFiltrationParent({parentName: "filtration_list_id", id: id})
        setSearchParams({...searchParams, characteristic: filtration})
    }

    function onRangeCommitted() {
        setSearchParams({...searchParams, price: rangePrice})
    }

    return (
        <div className={classes.productsPageWrapper}>
            <div className={classes.sidebar}>
                {/*<div style={{display: "flex", justifyContent: "space-around"}}>*/}
                {/*    <span>{searchParams.price[0]}</span>*/}
                {/*    <span>{searchParams.price[1]}</span>*/}
                {/*</div>*/}
                <RangeSlider
                    value={rangePrice}
                    setValue={setRangePrice}
                    onCommitted={onRangeCommitted}
                />
                <div className={classes.catalog}>
                    {
                        categories
                            .map(item =>
                                <Link to={`/categories/${item.id}`} key={item.id} onClick={useSetCategoryId}>
                                    {item.category_title}
                                </Link>
                            )
                    }
                </div>
            </div>
            <div className={classes.productsWrapper}>
                {
                    filtrationList
                        ?
                        <div className={classes.filtrationList}>
                            {
                                filtrationList
                                    .map((item, index) =>
                                        <FiltrationItem
                                            onClick={handleCharacteristic}
                                            key={index}
                                            item={item}
                                        />
                                    )
                            }
                        </div>
                        : ""
                }
                {
                    !products
                        ?
                        <div className={classes.noItemsTitle}>Товарів не знайдено</div>
                        :
                        <div>
                            <div className={classes.productsList}>
                                {
                                    products.map(
                                        item => <ProductItemComponent
                                            product={item}
                                            setMessage={setMessage}
                                            handleClick={handleClick}
                                            key={item.article}
                                        />
                                    )
                                }
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