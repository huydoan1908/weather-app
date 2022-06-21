import { actions } from "../reducer";
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

function dispatchWeatherData(dispatch, data) {
  // const [state, dispatch] = useContext(StoreContext);
  if (data) {
    const [current, forecast, background] = compressData(data);
    console.log(current, forecast, background);
    dispatch(actions.setCurrentData(current));
    dispatch(actions.setBackground(background));
    dispatch(actions.setForecastData(forecast));
  } else {
    dispatch(actions.setCurrentData(undefined));
    dispatch(actions.setBackground("day"));
    dispatch(actions.setForecastData(undefined));
  }
}

export default dispatchWeatherData;
