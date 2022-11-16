import $api from "../../http/http";
import {getFavouritesActionCreator} from "./favouritesReducer";

export const fetchFavourites = () => {
    return async (dispatch) => {
        const response = await $api.get('/api/shopping/favourites')
        dispatch(getFavouritesActionCreator(response.data))
    }
}
