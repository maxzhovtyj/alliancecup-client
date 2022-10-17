let favouritesDefaultState = {
    orders: [],
}

const GET_USER_ORDERS = "GET_USER_ORDERS"

export const userReducer = (state = favouritesDefaultState, action) => {
    switch (action.type) {
        case GET_USER_ORDERS: {
            if (action.payload) {
                return {...state, orders: [...action.payload]}
            } else
                return state
        }
        default:
            return state
    }
}

export const getUserOrdersActionCreator = (payload) => ({type: GET_USER_ORDERS, payload})
