import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackbar } from "./app";

const initialState = {
  email: "youremail@abc.com",
  isLoggedIn: false,
  token: "",
  isLoading: false,
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
      state.error = action.payload.error;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

// Reducers
export default slice.reducer;

// Login
export const LoginUser = (formValues) => {
  // formValues => {email, password}
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post("/auth/login", { ...formValues }, config)
      .then((response) => {
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
        console.error(error, "Something wrong here.");
      });
  };
};

// Logout
export const LogOutUser = () => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.signOut());
    dispatch(
      showSnackbar({
        severity: "success",
        message: "Logout successfully.",
      })
    );
  };
};

// Forget password
export const ForgotPassword = (formValues) => {
  // formValues => {email}
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post("/auth/forgot-password", { ...formValues }, config)
      .then((response) => {
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
        console.error(error, "Something wrong here.");
      });
  };
};

// New Password
export const NewPassword = (formValues) => {
  // formValues => { newPassword, confirmPassword, resetToken }
  let paramString = window.location.href.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  let resetToken;
  for (let pair of queryString.entries()) {
    resetToken = pair[1];
  }
  const data = {
    ...formValues,
    resetToken: resetToken,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post("/auth/reset-password", { ...data }, config)
      .then((response) => {
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
        console.error(error, "Something wrong here.");
      });
  };
};

// Sign up
export const RegisterUser = (formValues) => {
  // formValues => {firstName, lastName, email, password}
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post("/auth/register", { ...formValues }, config)
      .then((response) => {
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
        dispatch(
          slice.actions.updateRegisterEmail({ email: formValues.email })
        );
        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
        console.error(error, "Something wrong here.");
      })
      .finally(() => {
        if (!getState().auth.error) {
          window.location.href = "/auth/verify-account";
        }
      });
  };
};

// Verify OTP
export const VerifyOTP = (formValues) => {
  // formValues => {otp}
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    let data = {
      email: getState().auth.email,
      otp: formValues.otp,
    };
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post("/auth/verify-otp", { ...data }, config)
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
        console.error(error, "Something wrong here.");
      });
  };
};
