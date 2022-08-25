import {
    cannotLoadProductsActionCreator, clearFiltrationListActionCreator,
    getCategoriesActionCreator, getFiltrationListActionCreator,
    getMoreProductsActionCreator,
    getProductsActionCreator, loadProductsActionCreator, setFetchingActionCreator, setNotFetchingActionCreator
} from "./shopReducer";
import $api from "../../http/http";

export const fetchFiltrationList = (name, id) => {
    return async (dispatch) => {
        if (id === null) {
            dispatch(clearFiltrationListActionCreator())
            return
        }
        const response = await $api.get(`/api/filtration-list?parentName=${name}&id=${id}`)
        dispatch(getFiltrationListActionCreator(JSON.parse(JSON.stringify(response.data))))
    }
}

export const fetchCategories = () => {
    return async (dispatch) => {
        const response = await $api.get('/api/all-categories')
        dispatch(getCategoriesActionCreator(response.data))
    }
}

export const fetchProducts = ({id, createdAt, price, search, size, characteristic}) => {
    return async (dispatch) => {
        dispatch(loadProductsActionCreator())
        const response = await $api.get(
            `/api/get-products?category=${id}&created_at=${createdAt}&price=${price[0]}:${price[1]}&size=${size}&search=${search}&characteristic=${characteristic}`
        )
        dispatch(getProductsActionCreator(response.data))
    }
}

export const fetchMoreProducts = ({id, createdAt, price, search, size, characteristic}) => {
    return async (dispatch) => {
        dispatch(setFetchingActionCreator())
        const response = await $api.get(
            `/api/get-products?category=${id}&created_at=${createdAt}&price=${price[0]}:${price[1]}&size=${size}&search=${search}&characteristic=${characteristic}`
        )
        if (response.data.data !== null) {
            dispatch(getMoreProductsActionCreator(response.data))
        } else {
            dispatch(cannotLoadProductsActionCreator())
        }
        dispatch(setNotFetchingActionCreator())
    }
}
