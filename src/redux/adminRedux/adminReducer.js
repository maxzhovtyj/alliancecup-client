let adminDefaultState = {
    categories: [],
    products: [],
}

const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES"
const GET_PRODUCTS_FROM_CATEGORY = "GET_PRODUCTS_FROM_CATEGORY"
const GET_MORE_PRODUCTS = "GET_MORE_PRODUCTS"
const GET_FILTRATION_LIST = "GET_FILTRATION_LIST"
const CANNOT_LOAD_PRODUCTS = "CANNOT_LOAD_MORE"

const LOAD_PRODUCTS = "LOAD_PRODUCTS"

export const adminReducer = (state = adminDefaultState, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES: {
            return {...state, categories: [...action.payload.data]}
        }
        case GET_FILTRATION_LIST: {
            return {...state, filtrationList: action.payload}
        }
        case GET_PRODUCTS_FROM_CATEGORY: {
            return {...state, products: action.payload.data}
        }
        case GET_MORE_PRODUCTS: {
            return {...state, products: [...state.products, ...action.payload.data]}
        }
        case CANNOT_LOAD_PRODUCTS: {
            return {...state, statusNoMoreProducts: true}
        }
        case LOAD_PRODUCTS: {
            return {...state, statusNoMoreProducts: false}
        }
        default:
            return state
    }
}

export const getAdminCategoriesActionCreator = (payload) => ({type: GET_ALL_CATEGORIES, payload})

export const getAdminProductsActionCreator = (payload) => ({type: GET_PRODUCTS_FROM_CATEGORY, payload})
export const getMoreAdminProductsActionCreator = (payload) => ({type: GET_MORE_PRODUCTS, payload})

export const cannotLoadAdminProductsActionCreator = () => ({type: CANNOT_LOAD_PRODUCTS})
export const loadAdminProductsActionCreator = () => ({type: LOAD_PRODUCTS})

