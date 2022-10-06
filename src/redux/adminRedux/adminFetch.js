import $api from "../../http/http";
import {
    cannotLoadInventoriesActionCreator,
    cannotLoadSupplyActionCreator,
    getInventoriesActionCreator, getInventoryProductsActionCreator, getMoreInventoriesActionCreator,
    getMoreSupplyActionCreator, getOrdersActionCreator, getProductsToInventoryActionCreator,
    getSupplyActionCreator, getSupplyProductsActionCreator
} from "./adminReducer";
import {AdminService} from "../../service/AdminService";
import {SupplyService} from "../../service/SupplyService";

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

export const fetchSupplyProducts = (id) => {
    return async (dispatch) => {
        SupplyService.getSupplyProducts(id).then(res => {
            if (res.data === null) {
                // dispatch(cannotLoadSupplyActionCreator())
            } else {
                dispatch(getSupplyProductsActionCreator(res.data))
            }
        })
    }
}

export const fetchInventories = (createdAt) => {
    return async (dispatch) => {
        const response = await AdminService.getInventories(createdAt)
        if (response.data === null) {
            dispatch(cannotLoadInventoriesActionCreator())
        } else {
            dispatch(getInventoriesActionCreator(response.data))
        }
    }
}

export const fetchMoreInventories = (createdAt) => {
    return async (dispatch) => {
        const response = await AdminService.getInventories(createdAt)
        if (response.data === null) {
            dispatch(cannotLoadInventoriesActionCreator())
        } else {
            dispatch(getMoreInventoriesActionCreator(response.data))
        }
    }
}

export const fetchInventoryProducts = (id) => {
    return async (dispatch) => {
        const response = await AdminService.getInventoryProducts(id)
        if (response.data === null) {
            // dispatch(cannotLoadInventoriesActionCreator())
        } else {
            dispatch(getInventoryProductsActionCreator(response.data))
        }
    }
}

export const fetchProductsToInventory = () => {
    return async (dispatch) => {
        const response = await AdminService.getProductsToInventory()
        if (response.data === null) {
            // dispatch(cannotLoadInventoriesActionCreator())
        } else {
            dispatch(getProductsToInventoryActionCreator(response.data))
        }
    }
}

export const fetchOrders = (createdAt, orderStatus, search) => {
    return async (dispatch) => {
        const response = await AdminService.getOrders(createdAt, orderStatus, search)
        if (response.data === null) {
            // dispatch(cannotLoadInventoriesActionCreator())
            dispatch(getOrdersActionCreator([]))
        } else {
            dispatch(getOrdersActionCreator(response.data))
        }
    }
}
