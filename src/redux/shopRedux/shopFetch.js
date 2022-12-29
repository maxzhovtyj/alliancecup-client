import {
    cannotLoadProductsActionCreator, clearFiltrationListActionCreator,
    getCategoriesActionCreator, getFiltrationListActionCreator,
    getMoreProductsActionCreator,
    getProductsActionCreator, loadProductsActionCreator, setFetchingActionCreator, setNotFetchingActionCreator
} from "./shopReducer";
import $api from "../../http/http";
import {ProductService} from "../../service/ProductService";

export const fetchFiltrationList = (name, id) => {
    return async (dispatch) => {
        if (id === null) {
            dispatch(clearFiltrationListActionCreator())
            return
        }
        const response = await $api.get(`/api/filtration?parentName=${name}&id=${id}`)
        dispatch(getFiltrationListActionCreator(JSON.parse(JSON.stringify(response.data))))
    }
}

export const fetchCategories = () => {
    return async (dispatch) => {
        const response = await $api.get('/api/categories')
        if (response.data != null) {
            dispatch(getCategoriesActionCreator(response.data))
        } else {
            dispatch(getCategoriesActionCreator([]))
        }
    }
}

export const fetchFiltrationItems = () => {
    return async (dispatch) => {
        const response = await $api.get('/api/admin/characteristics')
        dispatch(getFiltrationListActionCreator(response.data))
    }
}

export const fetchProducts = ({
                                  id,
                                  createdAt,
                                  price,
                                  size,
                                  characteristic,
                                  search,
                              }) => {

    return async (dispatch) => {
        dispatch(loadProductsActionCreator())
        ProductService.getProducts(id, createdAt, price, size, characteristic, search).then(res => {
            if (!res || res?.status !== 200) {
                dispatch(getProductsActionCreator([]))
            }
            dispatch(getProductsActionCreator(res?.data))
        })
    }
}

export const fetchMoreProducts = ({id, createdAt, price, size, characteristic, search}) => {
    return async (dispatch) => {
        dispatch(setFetchingActionCreator())
        ProductService.getProducts(id, createdAt, price, size, characteristic, search).then(res => {
            if (res.data !== null) {
                dispatch(getMoreProductsActionCreator(res.data))
            } else {
                dispatch(cannotLoadProductsActionCreator())
            }
        })
        dispatch(setNotFetchingActionCreator())
    }
}
