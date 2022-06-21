import { useEffect, useContext } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { StoreContext } from "../../store";
import { actions } from "../../reducer";

//Import Component
import MainItem from "./MainItem";
import Background from "../Background";
import ForecastList from "../ForecastList";

function checkBackground(text, isDay) {
  const lowerText = text.toLocaleLowerCase();
  const name = ["rain", "overcast", "snow", "thunder"];
  const res = name.find((item) => lowerText.includes(item));
  if (res) return res;
  if (isDay) {
    return "day";
  } else {
    return "night";
  }
}

function compressData(data) {
  const current = {
    location: data.location.name,
    temp: data.current.temp_c,
    con_text: data.current.condition.text,
    con_icon: data.current.condition.icon,
    time: new Date(data.current.last_updated).toLocaleTimeString("vi-VI"),
    feel_like: data.current.feelslike_c,
    wind: data.current.wind_kph,
    vis: data.current.vis_km,
    is_day: data.current.is_day,
  };
  const background = checkBackground(current.con_text, current.is_day);
  const forecastData = data.forecast.forecastday[0].hour.filter(
    (item, index) => index % 4 === 2
  );
  const forecast = forecastData.map((item) => ({
    time: new Date(item.time).toLocaleTimeString("vi-VI"),
    temp: item.temp_c,
    con_text: item.condition.text,
    con_icon: item.condition.icon,
  }));
  return [current, forecast, background];
}

function Main() {
  const [state, dispatch] = useContext(StoreContext);
  useEffect(() => {
    const params = {
      key: process.env.REACT_APP_WEATHER_API_KEY,
      q: "Ha Noi",
      days: 1,
    };
    axios
      .get("http://api.weatherapi.com/v1/forecast.json", { params })
      .then((res) => {
        const data = res.data;
        const [current, forecast, background] = compressData(data);
        dispatch(actions.setCurrentData(current));
        dispatch(actions.setBackground(background));
        dispatch(actions.setForecastData(forecast));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box position="relative">
      <Box paddingTop="100px">
        <MainItem data={state.current} />
      </Box>
      <ForecastList data={state.forecast} />
      <Background name={state.background}></Background>
    </Box>
  );
}

export { compressData };
export default Main;
