import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { StoreContext } from "../../store";
import { actions } from "../../reducer";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorMessage = () => {
  const [state, dispatch] = useContext(StoreContext);
  const handleClose = () => {
    dispatch(actions.setErrorOpen(false));
  };
  return (
    <Snackbar
      open={state.error.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {state.error.message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorMessage;
