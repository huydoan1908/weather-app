import { styled } from "@mui/material";
import background from "./background";

const BackgroundImg = styled("div")((props) => ({
  position: "fixed",
  top: 0,
  height: "100vh",
  width: "100%",
  backgroundImage: `url('${background[props.name]}')`,
  backgroundSize: "cover",
  backgroundPosition: "center top",
  backgroundRepeat: "no-repeat",
  zIndex: -99,
}));

function Background(props) {
  return <BackgroundImg name={props.name}></BackgroundImg>;
}

export default Background;
