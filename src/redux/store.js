import {applyMiddleware, combineReducers, createStore} from "redux";

import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({

})

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store