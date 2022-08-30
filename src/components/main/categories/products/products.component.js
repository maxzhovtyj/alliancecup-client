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
import {Button, Stack} from "@mui/material";
import SimpleSnackbar from "../../../../UI/snackbar";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import {muiTextBtnTheme} from "../../../../UI/styles";
import {ThemeProvider} from "@mui/material/styles";
import RangeSlider from "../../../../UI/rangeSlider/rangeSlider";
import FiltrationItem from "../filtrationItem/filtrationItem";
import AllianceChip from "../../../../UI/AllianceChip";

function ProductsComponent() {
    const dispatch = useDispatch()

    const categories = useSelector(state => state.shop.categories)
    const products = useSelector(state => state.shop.products)
    const cannotLoadMore = useSelector(state => state.shop.statusNoMoreProducts)
    const filtrationList = useSelector(state => state.shop.filtrationList)

    let {open, setMessage, handleClick, message, handleClose} = useSnackbar()

    const [paramsChips, setParamsChips] = useState([

    ])
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
        dispatch(fetchFiltrationList(filtrationParent.parentName, filtrationParent.id))
    }, [dispatch, filtrationParent.id, filtrationParent.parentName, searchParams])

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
        setParamsChips([...paramsChips, filtration])
        setSearchParams({...searchParams, characteristic: filtration})
    }

    function onRangeCommitted() {
        setSearchParams({...searchParams, price: rangePrice})
    }

    const handleDelete = (name) => {
        setParamsChips(prevState => prevState.filter(item => item !== name))
        setSearchParams({...searchParams, characteristic: ""})
    };

    return (
        <>
            <Stack direction="row" spacing={1} className={classes.chipsList}>
                {
                    paramsChips.map((chipItem, index) =>
                    <AllianceChip key={index} name={chipItem} label={chipItem} onDelete={handleDelete} variant="outlined"/>)
                }
            </Stack>
            <div className={classes.productsPageWrapper}>
                <div className={classes.sidebar}>
                    <div className={classes.sidebarWrapper}>
                        <div className={classes.sidebarContainer}>
                            <div className={classes.priceRange}>
                                <p className={classes.priceRangeTitle}>Ціна</p>
                                <RangeSlider
                                    value={rangePrice}
                                    setValue={setRangePrice}
                                    onCommitted={onRangeCommitted}
                                />
                                <div className={classes.rangePrices}>
                                    <span>{rangePrice[0]}</span>
                                    <span>{rangePrice[1]}</span>
                                </div>
                            </div>
                            <div className={classes.catalog}>
                                {
                                    categories
                                        .map(item =>
                                            <Link
                                                to={`/categories/${item.id}`}
                                                key={item.id}
                                                onClick={useSetCategoryId}

                                            >
                                                <p className={classes.catalogItem}>{item.category_title}</p>
                                            </Link>
                                        )
                                }
                            </div>
                        </div>
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
                                            <div style={{display: "flex", justifyContent: "center", marginTop: "1rem"}}>
                                                <Button onClick={loadMore} className={classes.loadMoreBtn}
                                                        variant={"text"}
                                                        color="alliance">Завантажити ще</Button>
                                            </div>
                                        </ThemeProvider>
                                }
                                <SimpleSnackbar open={open} message={message} handleClose={handleClose}/>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}

export default ProductsComponent;