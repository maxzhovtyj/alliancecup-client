import {applyMiddleware, combineReducers, createStore} from "redux";

import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import {shopReducer} from "./shopRedux/shopReducer";
import {cartReducer} from "./userCartRedux/userCartReducer";
import {favouritesReducer} from "./userFavouritesRedux/favouritesReducer";
import {adminReducer} from "./adminRedux/adminReducer";
import {userReducer} from "./userRedux/userReducer";

const rootReducer = combineReducers({
    shop: shopReducer,
    cartPage: cartReducer,
    favouritesPage: favouritesReducer,
    admin: adminReducer,
    user: userReducer,
})

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store