import React from "react";
import "simplebar-react/dist/simplebar.min.css";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "./redux/slices/app";
// import ThemeSettings from "./components/settings";

const vertical = "bottom";
const horizontal = "center";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const App = () => {
  const { open, severity, message } = useSelector(
    (state) => state.app.snackbar
  );
  const dispatch = useDispatch();
  return (
    <>
      <ThemeProvider>
        {/* <ThemeSettings> */} <Router /> {/* </ThemeSettings> */}
      </ThemeProvider>
      {message && open && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            dispatch(closeSnackbar());
          }}
        >
          <Alert
            onClose={() => {
              dispatch(closeSnackbar());
            }}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default App;
