import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import symbol from "./reducers/symbol";

const rootReducer = combineReducers({ symbol });
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// [ 'Use Redux', 'Read the docs' ]
