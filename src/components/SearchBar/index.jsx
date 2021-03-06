import { useContext, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  styled,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import { StoreContext } from "../../store";
import { actions } from "../../reducer";
import dispatchWeatherData from "../../utils/dispatchWeatherData";

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "auto",
}));

const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
    },
  },
}));

function SearchBar() {
  const [state, dispatch] = useContext(StoreContext);
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(actions.setBackdrop(true));
    const params = {
      key: process.env.REACT_APP_WEATHER_API_KEY,
      q: searchText,
      days: 1,
    };
    try {
      const response = await axios.get(
        "https://api.weatherapi.com/v1/forecast.json",
        { params }
      );
      const data = response.data;
      dispatchWeatherData(dispatch, data);
      dispatch(actions.setBackdrop(false));
    } catch (error) {
      dispatch(
        actions.setErrorMessage("Location is invalid. Please try again.")
      );
      dispatch(actions.setErrorOpen(true));
      dispatchWeatherData(dispatch);
      dispatch(actions.setBackdrop(false));
    }
    setSearchText("");
  };

  const handleRefresh = async (e) => {
    dispatch(actions.setBackdrop(true));
    const params = {
      key: process.env.REACT_APP_WEATHER_API_KEY,
      q: "Ha Noi",
      days: 1,
    };
    try {
      const response = await axios.get(
        "https://api.weatherapi.com/v1/forecast.json",
        { params }
      );
      const data = response.data;
      dispatchWeatherData(dispatch, data);
      dispatch(actions.setBackdrop(false));
    } catch (error) {
      dispatch(
        actions.setErrorMessage("Location is invalid. Please try again.")
      );
      dispatch(actions.setErrorOpen(true));
      dispatchWeatherData(dispatch);
      dispatch(actions.setBackdrop(false));
    }
  };

  const handleMyLocation = (e) => {
    dispatch(actions.setBackdrop(true));
    navigator.geolocation.getCurrentPosition(
      async (res) => {
        const locationParams = {
          appid: process.env.REACT_APP_GEO_API_KEY,
          lat: res.coords.latitude,
          lon: res.coords.longitude,
        };
        try {
          const locationRes = await axios.get(
            "https://api.openweathermap.org/geo/1.0/reverse",
            { params: locationParams }
          );
          const cityName = locationRes.data[0].name;
          const weatherParams = {
            key: process.env.REACT_APP_WEATHER_API_KEY,
            q: cityName,
            days: 1,
          };
          const weatherRes = await axios.get(
            "https://api.weatherapi.com/v1/forecast.json",
            { params: weatherParams }
          );
          const data = weatherRes.data;
          dispatchWeatherData(dispatch, data);
          dispatch(actions.setBackdrop(false));
        } catch (error) {
          dispatch(
            actions.setErrorMessage("An error occurred. Please try again.")
          );
          dispatch(actions.setErrorOpen(true));
          dispatchWeatherData(dispatch);
          dispatch(actions.setBackdrop(false));
        }
      },
      (error) => {
        dispatch(
          actions.setErrorMessage("An error occurred. Please try again.")
        );
        dispatch(actions.setErrorOpen(true));
      }
    );
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Forecast
          </Typography>
          <IconButton size="large" onClick={handleMyLocation} color="inherit">
            <MyLocationIcon />
          </IconButton>
          <IconButton size="large" onClick={handleRefresh} color="inherit">
            <ReplayIcon />
          </IconButton>
          <Search onSubmit={handleSubmit}>
            <SearchIconWrapper type="submit">
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search???"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
              value={searchText}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchBar;
