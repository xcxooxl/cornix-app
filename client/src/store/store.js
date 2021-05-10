import { combineReducers, createStore } from "redux";

import market from "./reducers/market";
const rootReducer = combineReducers({ market });

const store = createStore(rootReducer);

export default store;

// [ 'Use Redux', 'Read the docs' ]
