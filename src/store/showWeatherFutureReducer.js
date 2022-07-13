const SHOW_FUTUTRE_WEATHER = "SHOW_FUTUTRE_WEATHER";
const HIDE_FUTUTRE_WEATHER = "HIDE_FUTUTRE_WEATHER";

export default function showWeatherFutureReducer(store = false, action) {
  switch(action.type) {
    case SHOW_FUTUTRE_WEATHER:
      return store = true;
    case HIDE_FUTUTRE_WEATHER:
      return store = false;
    default: return store;
  }
}

export const actionShowFutureAction = () => ({type: SHOW_FUTUTRE_WEATHER});
export const actionHideFutureAction = () => ({type: HIDE_FUTUTRE_WEATHER});