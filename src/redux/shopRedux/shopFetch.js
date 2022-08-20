import {
    cannotLoadProductsActionCreator,
    getCategoriesActionCreator,
    getMoreProductsActionCreator,
    getProductsActionCreator, loadProductsActionCreator, setFetchingActionCreator, setNotFetchingActionCreator
} from "./shopReducer";
import $api from "../../http/http";

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
