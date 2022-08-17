import {getCategoriesActionCreator, getMoreProductsActionCreator, getProductsActionCreator} from "./categoriestReducer";
import $api from "../../http/http";

export const fetchCategories = () => {
    return async (dispatch) => {
        const response = await $api.get('/api/all-categories')
        dispatch(getCategoriesActionCreator(response.data))
    }
}

export const fetchProducts = ({id, createdAt, leftPrice, rightPrice, search, size, characteristic}) => {
    return async (dispatch) => {
        const response = await $api.get(
            `/api/get-products?category=${id}&created_at=${createdAt}&price=${leftPrice}:${rightPrice}&size=${size}&search=${search}&characteristic=${characteristic}`
        )
        dispatch(getProductsActionCreator(response.data))
    }
}

export const fetchMoreProducts = ({id, createdAt, leftPrice, rightPrice, search, size, characteristic}) => {
    return async (dispatch) => {
        const response = await $api.get(
            `/api/get-products?category=${id}&created_at=${createdAt}&price=${leftPrice}:${rightPrice}&size=${size}&search=${search}&characteristic=${characteristic}`
        )
        dispatch(getMoreProductsActionCreator(response.data))
    }
}
