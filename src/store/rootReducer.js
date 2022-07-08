import { combineReducers, legacy_createStore  } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';


import cityNameReducer from "./cityNameReducer";

const rootReducer = combineReducers({
  cityNameReducer
})

export const store = legacy_createStore(rootReducer, composeWithDevTools());