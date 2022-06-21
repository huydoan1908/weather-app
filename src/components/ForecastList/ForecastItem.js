import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  styled,
  alpha,
} from "@mui/material";

const ItemCard = styled(Card)(({ theme }) => ({
  width: "45%",
  margin: ".5rem",
  backgroundColor: alpha(theme.palette.background.default, 0.6),
  borderRadius: "0",
  paddingTop: "24px",
  [theme.breakpoints.up("md")]: {
    width: "15%",
  },
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.default, 0.8),
  },
}));

function ForecastItem({ data }) {
  return (
    <ItemCard>
      <Typography variant="h6" fontWeight={300} textAlign="center">
        {data.time}
      </Typography>
      <CardMedia
        component="img"
        image={data.con_icon}
        alt="weather"
        sx={{ maxWidth: "64px", maxHeight: "64px", margin: "0 auto" }}
      />
      <CardContent>
        <Typography variant="body1" fontWeight={300} textAlign="center">
          {data.temp}°C
        </Typography>
        <Typography variant="body1" textAlign="center">
          {data.con_text}
        </Typography>
      </CardContent>
    </ItemCard>
  );
}

export default ForecastItem;
