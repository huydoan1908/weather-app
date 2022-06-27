import { useEffect, useContext } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { StoreContext } from "../../store";
import dispatchWeatherData from "../../utils/dispatchWeatherData";

//Import Component
import MainItem from "./MainItem";
import Background from "../Background";
import ForecastList from "../ForecastList";
import { actions } from "../../reducer";

function Main() {
  const [state, dispatch] = useContext(StoreContext);
  useEffect(() => {
    const params = {
      key: process.env.REACT_APP_WEATHER_API_KEY,
      q: "Ha Noi",
      days: 1,
    };
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.weatherapi.com/v1/forecast.json",
          { params }
        );
        const data = response.data;
        dispatchWeatherData(dispatch, data);
      } catch (error) {
        dispatch(
          actions.setErrorMessage("An error occurred. Please try again.")
        );
        dispatch(actions.setErrorOpen(true));
        dispatchWeatherData(dispatch);
      }
    }
    fetchData();
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

export default Main;
