let favouritesDefaultState = {
    favouritesList: [],
}

const GET_FAVOURITES = "GET_FAVOURITES"

export const favouritesReducer = (state = favouritesDefaultState, action) => {
    switch (action.type) {
        case GET_FAVOURITES: {
            return {...state, favouritesList: [...action.payload]}
        }
        default:
            return state
    }
}

export const getFavouritesActionCreator = (payload) => ({type: GET_FAVOURITES, payload})
