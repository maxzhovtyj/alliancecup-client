let categoriesDefaultState = {
    categories: [],
    products: []
}

const GET_ALL_CATEGORIES = "GET_ALL_POSTS"
const GET_PRODUCTS_FROM_CATEGORY = "GET_PRODUCTS_FROM_CATEGORY"
export const categoriesReducer = (state = categoriesDefaultState, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES: {
            return {...state, categories: [...action.payload.data]}
        }
        case GET_PRODUCTS_FROM_CATEGORY: {
            return {...state, products: action.payload.data}
        }
        default:
            return state
    }
}

export const getCategoriesActionCreator = (payload) => ({type: GET_ALL_CATEGORIES, payload})
export const getProductsActionCreator = (payload) => ({type: GET_PRODUCTS_FROM_CATEGORY, payload})