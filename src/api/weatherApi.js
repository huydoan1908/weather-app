import axios from "axios";

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

const weatherApi = async (cityName) => {
  const params = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    q: cityName,
    days: 1,
  };
  try {
    const response = await axios.get(
      "http://api.weatherapi.com/v1/forecast.json",
      { params }
    );
    const data = response.data;
    const [current, forecast, background] = compressData(data);
    console.log(current, forecast, background)
  } catch (error) {
    console.log(error);
  }
};

export default weatherApi;
