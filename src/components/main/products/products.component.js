import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCategories,
    fetchFiltrationList,
    fetchMoreProducts,
    fetchProducts
} from "../../../redux/shopRedux/shopFetch";
import {Link, useParams, useSearchParams} from "react-router-dom";

import classes from './products.module.scss'
import AllianceSnackbar from "../../../UI/snackbar";
import {useSnackbar} from "../../../hooks/useSnackbar";
import ProductsListComponent from "./productsList.component";
import FiltrationListComponent from "./filtration/filtrationList.component";
import RangeSliderComponent from "./rangeSlider.component";
import SearchBar from "../../../UI/searchBar/searchBar";

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

    const [search, setSearch] = useState(queryParams.get("search") || "")

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

    const getQueryPriceParam = () => {
        let param = queryParams.get("price")
        if (!param) return [0, 100]
        else return param.split(":").map(item => parseInt(item))
    }

    const getQueryParamMaxPrice = () => {
        let param = queryParams.get("price")
        if (!param) return 100
        else return param.split(":").map(item => parseInt(item))[1]
    }

    const [rangePrice, setRangePrice] = useState(getQueryPriceParam())
    const [rangePriceForm, setRangePriceForm] = useState(getQueryPriceParam())
    const [searchParams, setSearchParams] = useState({
        id: queryParams.get("categoryId") || "",
        price: getQueryPriceParam(),
        size: "",
        characteristic: queryParams.get("filtration") || "",
        createdAt: "",
        search: queryParams.get("search") || "",
        isActive: true
    })

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchProducts({
            ...searchParams,
            characteristic: queryParams.get("filtration") || "",
            search: queryParams.get("search") || ""
        }))

        setParentName(queryParams.get("filtrationId") === null
            ? parentCategory
            : parentFiltrationList)

        setFiltrationId(queryParams.get("filtrationId") === null
            ? queryParams.get("categoryId")
            : queryParams.get("filtrationId"))

        dispatch(fetchFiltrationList(parentName, filtrationId))
    }, [dispatch, filtrationId, parentName, queryParams, searchParams])

    const handleOnSearch = (e) => {
        e.preventDefault()

        let searchParams = {
            categoryId: queryParams.get("categoryId"),
            search: search
        }

        if (queryParams.get("filtrationId")) searchParams["filtrationId"] = queryParams.get("filtrationId")
        if (queryParams.get("filtration")) searchParams["filtration"] = queryParams.get("filtration")
        if (queryParams.get("price")) searchParams["price"] = queryParams.get("price")

        setQueryParams(searchParams)
    }


    function loadMore() {
        let lastCreatedAt = products[products.length - 1].createdAt
        dispatch(fetchMoreProducts({
            ...searchParams, createdAt: lastCreatedAt
        }))
    }

    function useSetCategoryId() {
        setSearchParams({...searchParams, id: useParams().id})
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
            <div className={classes.searchBar}>
                <SearchBar value={search} setValue={setSearch} onSearch={handleOnSearch}/>
            </div>
            <div className={classes.productsPageWrapper}>
                <div className={classes.sidebar}>
                    <div className={classes.sidebarWrapper}>
                        <div className={classes.sidebarContainer}>
                            <div className={classes.priceRange}>
                                <p className={classes.priceRangeTitle}>Ціна</p>
                                <RangeSliderComponent rangePrice={rangePrice}
                                                      onPriceRangeChange={onPriceRangeChange}
                                                      onRangeCommitted={onRangeCommitted}
                                                      applyRangePrice={applyRangePrice}
                                                      rangePriceForm={rangePriceForm}
                                                      handlePriceRangeForm={handlePriceRangeForm}
                                                      max={getQueryParamMaxPrice()}
                                />
                            </div>
                            <div className={classes.catalog}>
                                {
                                    categories
                                        .map(item =>
                                            <Link to={`/products?categoryId=${item.id}`}
                                                  key={item.id}
                                                  onClick={useSetCategoryId}
                                            >
                                                <p className={classes.catalogItem}>{item.categoryTitle}</p>
                                            </Link>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
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