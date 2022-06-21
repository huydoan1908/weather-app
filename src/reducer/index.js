import * as types from "./constants";
import * as actions from "./actions";
const initState = {
  searchText: "",
  current: {},
  forecast: [],
  background: "",
  backdrop: false,
};

function reducer(state, action) {
  switch (action.type) {
    case types.SET_CURRENT_DATA:
      return {
        ...state,
        current: action.payload,
      };
    case types.SET_FORECAST_DATA:
      return {
        ...state,
        forecast: action.payload,
      };
    case types.SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      };
    case types.SET_BACKGROUND:
      return {
        ...state,
        background: action.payload,
      };
    case types.SET_BACKDROP:
      return {
        ...state,
        backdrop: action.payload,
      };
    default:
      return state;
  }
}

export { initState, types, actions };
export default reducer;
