import * as types from "./constants";

export const setCurrentData = (payload) => ({
  type: types.SET_CURRENT_DATA,
  payload,
});

export const setForecastData = (payload) => ({
  type: types.SET_FORECAST_DATA,
  payload,
});

export const setSearchText = (payload) => ({
  type: types.SET_SEARCH_TEXT,
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