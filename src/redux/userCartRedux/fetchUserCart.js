import $api from "../../http/http";
import {userCartActionCreator} from "./userCartReducer";

export const fetchUserCart = () => {
    return async (dispatch) => {
        const response = await $api.get('/api/shopping/cart')
        dispatch(userCartActionCreator(response.data))
    }
}