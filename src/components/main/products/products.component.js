import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCategories,
    fetchFiltrationList,
    fetchMoreProducts,
    fetchProducts
} from "../../../redux/shopRedux/shopFetch";
import {useSearchParams} from "react-router-dom";

import classes from './products.module.scss'
import AllianceSnackbar from "../../../UI/snackbar";
import {useSnackbar} from "../../../hooks/useSnackbar";
import ProductsListComponent from "./productsList.component";
import FiltrationListComponent from "./filtration/filtrationList.component";
import ProductsPageSidebar from "./sidebar/productsPageSidebar";

const parentCategory = "category_id"
const parentFiltrationList = "filtration_list_id"

function ProductsComponent() {
    const dispatch = useDispatch()

    const [queryParams, setQueryParams] = useSearchParams()
    const snackbar = useSnackbar()

    const categories = useSelector(state => state.shop.categories)
    const products = useSelector(state => state.shop.products)
    const cannotLoadMore = useSelector(state => state.shop.statusNoMoreProducts)
    const filtrationList = useSelector(state => state.shop.filtrationList)

    const [parentName, setParentName] = useState(
        queryParams.get("filtrationId") === null
            ? parentCategory
            : parentFiltrationList
    )

    const [filtrationId, setFiltrationId] = useState(
        queryParams.get("filtrationId") === null
            ? queryParams.get("categoryId")
            : queryParams.get("filtrationId")
    )

    const getQueryPriceParam = useCallback(() => {
        let param = queryParams.get("price")
        if (!param) return [0, 100]
        else return param.split(":").map(item => parseInt(item))
    }, [queryParams])

    const getQueryParamMaxPrice = () => {
        let param = queryParams.get("price")
        if (!param) return 100
        else return param.split(":").map(item => parseInt(item))[1]
    }

    const [rangePrice, setRangePrice] = useState(getQueryPriceParam())
    const [rangePriceForm, setRangePriceForm] = useState(getQueryPriceParam())
    const [searchParams, setSearchParams] = useState({
        id: queryParams.get("categoryId") || "",
        price: queryParams.get("price")?.split(":")?.map(item => parseInt(item)) || "",
        characteristic: queryParams.get("filtration") || "",
        createdAt: "",
        search: queryParams.get("search") || "",
        isActive: true
    })

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    useEffect(() => {
        setRangePriceForm(getQueryPriceParam())
        setRangePrice(getQueryPriceParam())

        let searchParamPrice = (queryParams.get("price") !== null)
            ? queryParams.get("price").split(":").map(item => parseInt(item))
            : ""

        dispatch(fetchProducts({
            ...searchParams,
            characteristic: queryParams.get("filtration") || "",
            search: queryParams.get("search") || "",
            price: searchParamPrice,
        }))

        setParentName(queryParams.get("filtrationId") === null
            ? parentCategory
            : parentFiltrationList)

        setFiltrationId(queryParams.get("filtrationId") === null
            ? queryParams.get("categoryId")
            : queryParams.get("filtrationId"))

        dispatch(fetchFiltrationList(parentName, filtrationId))
    }, [dispatch, filtrationId, getQueryPriceParam, parentName, queryParams, searchParams])

    function loadMore() {
        let lastCreatedAt = products[products.length - 1].createdAt
        dispatch(fetchMoreProducts({
            id: searchParams.id,
            createdAt: lastCreatedAt,
            price: searchParams.price,
            characteristic: searchParams.characteristic,
            search: searchParams.search,
            isActive: true,
        }))
    }

    function handleSetCategoryId(id) {
        setSearchParams({...searchParams, id})
        setQueryParams({categoryId: id})
    }

    const pushFiltration = (searchKey, searchCharacteristic) => {
        const queryFiltration = queryParams.get("filtration")
        if (!queryFiltration) {
            return `${searchKey}:${searchCharacteristic}`
        } else return queryFiltration + `|${searchKey}:${searchCharacteristic}`
    }

    function handleCharacteristic(searchKey, searchCharacteristic, id) {
        const filtration = pushFiltration(searchKey, searchCharacteristic)

        let queryParamsObj = {
            categoryId: queryParams.get("categoryId"),
            filtration: filtration,
            filtrationId: id,
        }
        if (queryParams.get("price")) queryParamsObj["price"] = queryParams.get("price")
        if (queryParams.get("search")) queryParamsObj["search"] = queryParams.get("search")

        setQueryParams(queryParamsObj)
        setParentName(parentFiltrationList)
        setFiltrationId(id)
        setSearchParams({...searchParams, characteristic: filtration})
    }

    const handlePriceRangeForm = (event) => {
        if (event.target.name === "min") {
            setRangePriceForm(prevState => [parseInt(event.target.value) || 0, prevState[1]])
        } else if (event.target.name === "max") {
            setRangePriceForm(prevState => [prevState[0], parseInt(event.target.value) || 0])
        }
    }

    const applyRangePrice = (event) => {
        event.preventDefault()
        setSearchParams({...searchParams, price: rangePriceForm})
        setRangePrice(rangePriceForm)

        let queryParamsObj = {
            categoryId: queryParams.get("categoryId"),
            price: `${rangePriceForm[0]}:${rangePriceForm[1]}`
        }

        if (queryParams.get("filtrationId")) queryParamsObj["filtrationId"] = filtrationId
        if (queryParams.get("filtration")) queryParamsObj["filtration"] = searchParams.characteristic
        if (queryParams.get("search")) queryParamsObj["search"] = queryParams.get("search")

        setQueryParams(queryParamsObj)
    }

    function onRangeCommitted() {
        setSearchParams({...searchParams, price: rangePrice})
        let queryParamsObj = {
            categoryId: queryParams.get("categoryId"),
            price: `${rangePrice[0]}:${rangePrice[1]}`
        }

        if (queryParams.get("filtrationId")) queryParamsObj["filtrationId"] = filtrationId
        if (queryParams.get("search")) queryParamsObj["search"] = queryParams.get("search")
        if (queryParams.get("filtration")) queryParamsObj["filtration"] = searchParams.characteristic

        setQueryParams(queryParamsObj)
    }

    const onPriceRangeChange = (event, newValue) => {
        setRangePrice(newValue)
        setRangePriceForm(newValue)
    }

    return (
        <>
            <div className={classes.productsPageWrapper}>
                <ProductsPageSidebar categories={categories}
                                     applyRangePrice={applyRangePrice} rangePrice={rangePrice}
                                     getQueryParamMaxPrice={getQueryParamMaxPrice}
                                     handlePriceRangeForm={handlePriceRangeForm} onPriceRangeChange={onPriceRangeChange}
                                     rangePriceForm={rangePriceForm} onRangeCommitted={onRangeCommitted}
                                     handleSetCategoryId={handleSetCategoryId}
                />
                <div className={classes.productsWrapper}>
                    <FiltrationListComponent
                        filtrationList={filtrationList}
                        handleCharacteristic={handleCharacteristic}
                    />
                    <ProductsListComponent
                        products={products}
                        loadMore={loadMore}
                        cannotLoadMore={cannotLoadMore}
                        handleClick={snackbar.handleClick}
                        setMessage={snackbar.setMessage}
                    />
                </div>
            </div>
            <AllianceSnackbar open={snackbar.open} message={snackbar.message} handleClose={snackbar.handleClose}/>
        </>
    );
}

export default ProductsComponent;