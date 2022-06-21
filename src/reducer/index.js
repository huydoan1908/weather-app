import * as types from "./constants";
import * as actions from "./actions";
const initState = {
  current: {},
  forecast: [],
  background: "",
  backdrop: false,
  error:{
    message: "",
    open: false
  }
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
    case types.SET_ERROR_MESSAGE:
      return {
        ...state,
        error: {
          ...state.error,
          message: action.payload,
        },
      };
    case types.SET_ERROR_OPEN:
      return {
        ...state,
        error: {
          ...state.error,
          open: action.payload,
        },
      };
    default:
      return state;
  }
}

export { initState, types, actions };
export default reducer;
