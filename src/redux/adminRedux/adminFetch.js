import $api from "../../http/http";
import {cannotLoadSupplyActionCreator, getMoreSupplyActionCreator, getSupplyActionCreator} from "./adminReducer";

export const fetchSupply = () => {
    return async (dispatch) => {
        const response = await $api.get('/api/admin/supply')
        if (response.data === null) {
            dispatch(cannotLoadSupplyActionCreator())
        } else {
            dispatch(getSupplyActionCreator(response.data))
        }
    }
}

export const fetchMoreSupply = (createdAt) => {
    return async (dispatch) => {
        const response = await $api.get(`/api/admin/supply?createdAt=${createdAt}`)
        if (response.data === null) {
            dispatch(cannotLoadSupplyActionCreator())
        } else {
            dispatch(getMoreSupplyActionCreator(response.data))
        }
    }
}