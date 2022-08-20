import {applyMiddleware, combineReducers, createStore} from "redux";

import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import {shopReducer} from "./shopRedux/shopReducer";
import {cartReducer} from "./userCartRedux/userCartReducer";

const rootReducer = combineReducers({
    shop: shopReducer,
    cartPage: cartReducer
})

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store