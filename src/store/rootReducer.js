import { combineReducers, legacy_createStore  } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';


import cityNameReducer from "./cityNameReducer";
import showWeatherFutureReducer from "./showWeatherFutureReducer";

const rootReducer = combineReducers({
  cityNameReducer,
  showWeatherFutureReducer
})

export const store = legacy_createStore(rootReducer, composeWithDevTools());