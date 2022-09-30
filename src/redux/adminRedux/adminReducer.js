let adminDefaultState = {
    supply: [],
    supplyProducts: [],
    inventories: [],
    products: [],
    statusNoMoreSupply: false,
    statusNoMoreInventories: false,
}

const GET_ALL_SUPPLY = "GET_ALL_SUPPLY"
const GET_MORE_SUPPLY = "GET_MORE_SUPPLY"
const LOAD_SUPPLY = "LOAD_SUPPLY"
const CANNOT_LOAD_SUPPLY = "CANNOT_LOAD_SUPPLY"

const GET_SUPPLY_PRODUCTS = "GET_SUPPLY_PRODUCTS"

const GET_INVENTORIES = "GET_INVENTORIES"
const GET_MORE_INVENTORIES = "GET_MORE_INVENTORIES"
const LOAD_INVENTORIES = "LOAD_INVENTORIES"
const CANNOT_LOAD_INVENTORIES = "CANNOT_LOAD_INVENTORIES"

const GET_INVENTORY_PRODUCTS = "GET_INVENTORY_PRODUCTS"

const GET_PRODUCTS_TO_INVENTORY = "GET_PRODUCTS_TO_INVENTORY"

export const adminReducer = (state = adminDefaultState, action) => {
    switch (action.type) {
        case GET_ALL_SUPPLY : {
            return {...state, supply: [...action.payload]}
        }
        case GET_MORE_SUPPLY: {
            return {...state, supply: [...state.supply, ...action.payload]}
        }
        case LOAD_SUPPLY: {
            return {...state, statusNoMoreSupply: false}
        }
        case CANNOT_LOAD_SUPPLY: {
            return {...state, statusNoMoreSupply: true}
        }

        case GET_INVENTORIES: {
            return {...state, inventories: [...action.payload]}
        }
        case GET_MORE_INVENTORIES: {
            return {...state, inventories: [...state.inventories, ...action.payload]}
        }
        case LOAD_INVENTORIES: {
            return {...state, statusNoMoreInventories: false}
        }
        case CANNOT_LOAD_INVENTORIES: {
            return {...state, statusNoMoreInventories: true}
        }

        case GET_INVENTORY_PRODUCTS: {
            return {...state, products: [...action.payload]}
        }

        case GET_SUPPLY_PRODUCTS: {
            return {...state, supplyProducts: [...action.payload]}
        }

        case GET_PRODUCTS_TO_INVENTORY: {
            return {...state, products: [...action.payload]}
        }
        default:
            return state
    }
}

export const getSupplyActionCreator = (payload) => ({type: GET_ALL_SUPPLY, payload})
export const getMoreSupplyActionCreator = (payload) => ({type: GET_MORE_SUPPLY, payload})
export const loadSupplyActionCreator = () => ({type: LOAD_SUPPLY})
export const cannotLoadSupplyActionCreator = () => ({type: CANNOT_LOAD_SUPPLY})

export const getSupplyProductsActionCreator = (payload) => ({type: GET_SUPPLY_PRODUCTS, payload})

export const getInventoriesActionCreator = (payload) => ({type: GET_INVENTORIES, payload})
export const getMoreInventoriesActionCreator = (payload) => ({type: GET_MORE_INVENTORIES, payload})
export const cannotLoadInventoriesActionCreator = () => ({type: CANNOT_LOAD_INVENTORIES})

export const getInventoryProductsActionCreator = (payload) => ({type: GET_INVENTORY_PRODUCTS, payload})
export const getProductsToInventoryActionCreator = (payload) => ({type: GET_PRODUCTS_TO_INVENTORY, payload})
