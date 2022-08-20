import $api from "../../http/http";
import {addToCartActionCreator, userCartActionCreator} from "./userCartReducer";

// let cartProducts = "cartProducts"

export const fetchAddToCart = (isAuth, product) => {
    return async (dispatch) => {
        if (isAuth) {
            const response = await $api.post('/api/client/add-to-cart', product)
            console.log(response.data)
            dispatch(addToCartActionCreator(response.data))
        } else {
            // TODO ADD TO CART FOR UNAUTHENTICATED USER
            // localStorage.setItem(cartProducts, )
        }
    }
}

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