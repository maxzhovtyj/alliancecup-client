let shopDefaultState = {
    categories: [],
    products: [],
    filtrationList: [],
    statusNoMoreProducts: false,
    isFetching: false
}

const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES"
const GET_PRODUCTS_FROM_CATEGORY = "GET_PRODUCTS_FROM_CATEGORY"
const GET_MORE_PRODUCTS = "GET_MORE_PRODUCTS"
const GET_FILTRATION_LIST = "GET_FILTRATION_LIST"
const CANNOT_LOAD_PRODUCTS = "CANNOT_LOAD_MORE"

const LOAD_PRODUCTS = "LOAD_PRODUCTS"

const IS_FETCHING = "IS_FETCHING"
const NOT_FETCHING = "NOT_FETCHING"
const CLEAR_FILTRATION_LIST = "CLEAR_FILTRATION_LIST"

export const shopReducer = (state = shopDefaultState, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES: {
            return {...state, categories: action.payload}
        }
        case GET_FILTRATION_LIST: {
            return {...state, filtrationList: action.payload}
        }
        case CLEAR_FILTRATION_LIST: {
            return {...state, filtrationList: []}
        }
        case GET_PRODUCTS_FROM_CATEGORY: {
            return {...state, products: action.payload}
        }
        case GET_MORE_PRODUCTS: {
            return {...state, products: [...state.products, ...action.payload]}
        }
        case CANNOT_LOAD_PRODUCTS: {
            return {...state, statusNoMoreProducts: true}
        }
        case LOAD_PRODUCTS: {
            return {...state, statusNoMoreProducts: false}
        }
        case IS_FETCHING: {
            return {...state, isFetching: true}
        }
        case NOT_FETCHING: {
            return {...state, isFetching: false}
        }
        default:
            return state
    }
}

export const getCategoriesActionCreator = (payload) => ({type: GET_ALL_CATEGORIES, payload})

export const getFiltrationListActionCreator = (payload) => ({type: GET_FILTRATION_LIST, payload})
export const clearFiltrationListActionCreator = () => ({type: CLEAR_FILTRATION_LIST})

export const getProductsActionCreator = (payload) => ({type: GET_PRODUCTS_FROM_CATEGORY, payload})
export const getMoreProductsActionCreator = (payload) => ({type: GET_MORE_PRODUCTS, payload})

export const cannotLoadProductsActionCreator = () => ({type: CANNOT_LOAD_PRODUCTS})
export const loadProductsActionCreator = () => ({type: LOAD_PRODUCTS})

export const setFetchingActionCreator = () => ({type: IS_FETCHING})
export const setNotFetchingActionCreator = () => ({type: NOT_FETCHING})