import {applyMiddleware, combineReducers, createStore} from "redux";

import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import {categoriesReducer} from "./categoriesRedux/categoriestReducer";

const rootReducer = combineReducers({
    categories: categoriesReducer
})

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store