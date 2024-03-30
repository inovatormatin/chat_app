import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED, SHARED
  },
  snackbar: {
    open: null,
    severity: null,
    message: null,
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Toggle sidebar
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    // To select the type
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    // To update snackbar
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackbar(state, action) {
      state.snackbar.open = false;
      state.snackbar.severity = null;
      state.snackbar.message = null;
    },
  },
});

// reducer
export default slice.reducer;

// --> actions

// ToggleSideBar
export const ToggleSidebar = () => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebar());
  };
};

// UpdateSidebarType
export const UpdateSiderbarType = (type) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateSidebarType({
        type,
      })
    );
  };
};

// show snackbar
export const showSnackbar = ({ severity, message }) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackbar({
        severity,
        message,
      })
    );

    setTimeout(() => {
      dispatch(slice.actions.closeSnackbar());
    }, 4000);
  };
};

// close snackbar
export const closeSnackbar = () => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackbar());
  };
};
