import {getCategoriesActionCreator, getProductsActionCreator} from "./categoriestReducer";
import $api from "../../http/http";

export const fetchCategories = () => {
    return async (dispatch) => {
        const response = await $api.get('/api/all-categories')
        dispatch(getCategoriesActionCreator(response.data))
    }
}

export const fetchProducts = ({id, createdAt, leftPrice, rightPrice}) => {
    return async (dispatch) => {
        const response = await $api.get(
            `/api/get-products?category=${id}&created_at=${createdAt}&price=${leftPrice}:${rightPrice}`
        )
        dispatch(getProductsActionCreator(response.data))
    }
}
