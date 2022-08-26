import $api from "../../http/http";
import {getFavouritesActionCreator} from "./favouritesReducer";
import {favouriteProductsStorage} from "../../service/ShoppingService";

export const fetchFavourites = (isAuth) => {
    return async (dispatch) => {
        if (isAuth) {
            const response = await $api.get('/api/client/get-favourites')
            dispatch(getFavouritesActionCreator(response.data?.products))
        } else {
            let favourites = JSON.parse(localStorage.getItem(favouriteProductsStorage))
            if (favourites) {
                dispatch(getFavouritesActionCreator(favourites.products))
            }
        }
    }
}
