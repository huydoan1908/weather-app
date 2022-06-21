import { useContext } from "react";
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
import { compressData } from "../Main";

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
    // vertical padding + font size from searchIcon
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
  const handleSearchChange = (e) => {
    dispatch(actions.setSearchText(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.setBackdrop(true));
    const params = {
      key: process.env.REACT_APP_WEATHER_API_KEY,
      q: state.searchText,
      days: 1,
    };
    axios
      .get("https://api.weatherapi.com/v1/forecast.json", { params })
      .then((res) => {
        const data = res.data;
        const [current, forecast, background] = compressData(data);
        dispatch(actions.setCurrentData(current));
        dispatch(actions.setBackground(background));
        dispatch(actions.setForecastData(forecast));
        dispatch(actions.setBackdrop(false));
      })
      .catch((error) => {
        dispatch(actions.setCurrentData(undefined));
        dispatch(actions.setBackground("day"));
        dispatch(actions.setForecastData(undefined));
        dispatch(actions.setBackdrop(false));
      });
    dispatch(actions.setSearchText(""));
  };

  const handleRefresh = (e) => {
    dispatch(actions.setBackdrop(true));
    const params = {
      key: process.env.REACT_APP_WEATHER_API_KEY,
      q: "Ha Noi",
      days: 1,
    };
    axios
      .get("https://api.weatherapi.com/v1/forecast.json", { params })
      .then((res) => {
        const data = res.data;
        const [current, forecast, background] = compressData(data);
        dispatch(actions.setCurrentData(current));
        dispatch(actions.setBackground(background));
        dispatch(actions.setForecastData(forecast));
        dispatch(actions.setBackdrop(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(actions.setBackdrop(false));
      });
  };

  const handleMyLocation = (e) => {
    dispatch(actions.setBackdrop(true));
    navigator.geolocation.getCurrentPosition(
      (res) => {
        const params = {
          appid: process.env.REACT_APP_GEO_API_KEY,
          lat: res.coords.latitude,
          lon: res.coords.longitude,
        };
        axios
          .get("https://api.openweathermap.org/geo/1.0/reverse", { params })
          .then((res) => {
            const cityName = res.data[0].name;
            console.log(cityName);
            const params = {
              key: process.env.REACT_APP_WEATHER_API_KEY,
              q: cityName,
              days: 1,
            };
            axios
              .get("https://api.weatherapi.com/v1/forecast.json", { params })
              .then((res) => {
                const data = res.data;
                const [current, forecast, background] = compressData(data);
                dispatch(actions.setCurrentData(current));
                dispatch(actions.setBackground(background));
                dispatch(actions.setForecastData(forecast));
                dispatch(actions.setBackdrop(false));
              })
              .catch((error) => {
                console.log(error);
                dispatch(actions.setBackdrop(false));
              });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      (error) => console.log(error)
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
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
              value={state.searchText}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchBar;
