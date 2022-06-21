import * as types from "./constants";

export const setCurrentData = (payload) => ({
  type: types.SET_CURRENT_DATA,
  payload,
});

export const setForecastData = (payload) => ({
  type: types.SET_FORECAST_DATA,
  payload,
});

export const setBackground = (payload) => ({
  type: types.SET_BACKGROUND,
  payload,
});

export const setBackdrop = (payload) => ({
  type: types.SET_BACKDROP,
  payload,
});

export const setErrorMessage = (payload) => ({
  type: types.SET_ERROR_MESSAGE,
  payload,
});

export const setErrorOpen = (payload) => ({
  type: types.SET_ERROR_OPEN,
  payload,
});