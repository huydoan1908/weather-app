import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  styled,
  alpha,
} from "@mui/material";

const ItemCard = styled(Card)(({ theme }) => ({
  width: "auto",
  margin: "1rem",
  backgroundColor: alpha(theme.palette.background.default, 0.6),
  borderRadius: "0",
  [theme.breakpoints.up("md")]: {
    width: "40%",
    margin: "0 auto",
  },
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.default, 0.8),
  },
}));

function MainItem({ data }) {
  const InvalidItem = (
    <ItemCard>
      <CardHeader
        title="Invalid Location"
        component="h4"
        fontWeight={400}
        align="center"
      />
      <CardContent>
        <Typography variant="h5" align="center" fontWeight={300} mb={1}>
          Please enter valid location.
        </Typography>
      </CardContent>
    </ItemCard>
  );

  return !data ? (
    InvalidItem
  ) : (
    <ItemCard>
      <CardHeader
        title={data.location}
        component="h4"
        fontWeight={400}
        align="center"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <CardMedia
          component="img"
          image={data.con_icon}
          alt="weather"
          sx={{ maxWidth: "100px", maxHeight: "100px" }}
        />
        <Box p={2}>
          <Typography variant="h4" sx={{ display: "inline" }}>
            {data.temp}
          </Typography>
          <Typography variant="h4" sx={{ display: "inline" }}>
            °C
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Typography variant="h5" align="center" fontWeight={300} mb={1}>
          {data.con_text}
        </Typography>
        <Typography variant="body2" align="center" fontWeight={200} mb={1}>
          Updated as of {data.time}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body2" fontWeight={200} component="span" mx={1}>
            Feel likes {data.feel_like}°
          </Typography>
          <Typography variant="body2" fontWeight={200} component="span" mx={1}>
            Wind {data.wind} km/h
          </Typography>
          <Typography variant="body2" fontWeight={200} component="span" mx={1}>
            Vibility {data.vis} km
          </Typography>
        </Box>
      </CardContent>
    </ItemCard>
  );
}

export default MainItem;
