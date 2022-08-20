let cartDefaultState = {
    cart: [],
    sum: null
}

const GET_FROM_CART = "GET_FROM_CART"
const ADD_TO_CART = "ADD_TO_CART"
// const DELETE_FROM_CART = "DELETE_FROM_CART"

export const cartReducer = (state = cartDefaultState, action) => {
    switch (action.type) {
        case GET_FROM_CART: {
            return {...state, cart: action.payload.products, sum: action.payload.sum}
        }
        // case DELETE_FROM_CART: {
        //     return {...state, cart: this.cart.filter(item => item !== action.payload.id)}
        // }
        case ADD_TO_CART: {
            return {...state, cart: [...state.cart, action.payload]}
        }
        default: {
            return state
        }
    }
}

// export const deleteFromCartActionCreator = (payload) => ({type: DELETE_FROM_CART, payload})
export const userCartActionCreator = (payload) => ({type: GET_FROM_CART, payload})
export const addToCartActionCreator = (payload) => ({type: ADD_TO_CART, payload})
