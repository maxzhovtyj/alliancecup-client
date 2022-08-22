import $api from "../../http/http";
import {userCartActionCreator} from "./userCartReducer";

// let cartProducts = "cartProducts"

export const fetchUserCart = () => {
    return async (dispatch) => {
        const response = await $api.get('/api/client/user-cart')
        dispatch(userCartActionCreator(response.data))
    }
}

export const fetchDeleteFromCart = (productId) => {
    return async () => {
        await $api.delete(`/api/client/delete-from-cart?id=${productId}`,)
        // dispatch(userCartActionCreator(response.data.id))
    }
}