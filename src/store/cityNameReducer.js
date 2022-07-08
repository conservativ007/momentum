const SETNAME = "SETNAME";

export default function cityNameReducer(store = "", action) {
  switch(action.type) {
    case SETNAME:
      return store = action.payload;
    default: return store;
  }
}

export const addActionCityName = (payload) => ({type: SETNAME, payload})