import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import market from "./reducers/market";

const rootReducer = combineReducers({ market });
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// [ 'Use Redux', 'Read the docs' ]
