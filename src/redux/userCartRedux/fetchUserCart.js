import $api from "../../http/http";
import {userCartActionCreator} from "./userCartReducer";
import {cartProductsStorage} from "../../service/ShoppingService";

export const fetchUserCart = (isAuth) => {
    return async (dispatch) => {
        const response = await $api.get('/api/shopping/cart')
        dispatch(userCartActionCreator(response.data))
    }
}