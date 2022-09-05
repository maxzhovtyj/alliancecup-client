let adminDefaultState = {
    supply: [],
    statusNoMoreSupply: false
}

const GET_ALL_SUPPLY = "GET_ALL_SUPPLY"
const GET_MORE_SUPPLY = "GET_MORE_SUPPLY"
const LOAD_SUPPLY = "LOAD_SUPPLY"
const CANNOT_LOAD_SUPPLY = "CANNOT_LOAD_SUPPLY"

export const adminReducer = (state = adminDefaultState, action) => {
    switch (action.type) {
        case GET_ALL_SUPPLY : {
            return {...state, supply: [...action.payload]}
        }
        case GET_MORE_SUPPLY: {
            return {...state, supply: [...state.supply, ...action.payload]}
        }
        case CANNOT_LOAD_SUPPLY: {
            return {...state, statusNoMoreSupply: true}
        }
        case LOAD_SUPPLY: {
            return {...state, statusNoMoreSupply: false}
        }
        default:
            return state
    }
}

export const getSupplyActionCreator = (payload) => ({type: GET_ALL_SUPPLY, payload})

export const getMoreSupplyActionCreator = (payload) => ({type: GET_MORE_SUPPLY, payload})

export const loadSupplyActionCreator = () => ({type: LOAD_SUPPLY})
export const cannotLoadSupplyActionCreator = () => ({type: CANNOT_LOAD_SUPPLY})

