import { Box, Typography } from "@mui/material";
import ForecastItem from "./ForecastItem";

function ForecastList({ data }) {
  if (!data) return;
  const forecastList = data.map((item, index) => {
    return <ForecastItem key={index} data={item} />;
  });
  return (
    <Box my={5}>
      <Typography variant="h5" fontWeight={300} color="white" mx={5}>Forecast</Typography>
      <Box display="flex" justifyContent="space-evenly" flexWrap="wrap" my={2}>
        {forecastList}
      </Box>
    </Box>
  );
}

export default ForecastList;
