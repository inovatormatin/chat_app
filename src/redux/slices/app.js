import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

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
  users: [],
  friends: [],
  freindRequests: [],
  chat_type: null, // group_chat, indivisual_chat
  room_id: null, // group_chat_id, indivisual_chat_id
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
    // To open snackbar
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    // To close snackbar
    closeSnackbar(state, action) {
      state.snackbar.open = false;
      state.snackbar.severity = null;
      state.snackbar.message = null;
    },
    // Update user list
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    // Update Freinds
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    // Update Freind request
    updateFriendRequest(state, action) {
      state.freindRequests = action.payload.friendRequest;
    },
    //
    selectConversation(state, action) {
      state.chat_type = "individual";
      state.room_id = action.payload.room_id;
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

// Fetching users
export const fetchUsers = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        dispatch(
          slice.actions.updateUsers({
            users: response.data.data,
          })
        );
      })
      .catch((error) => console.log(error));
  };
};
// Fetching Friends
export const fetchFriends = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-friends", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        dispatch(
          slice.actions.updateFriends({
            friends: response.data.data,
          })
        );
      })
      .catch((error) => console.log(error));
  };
};
// Fetching Friend request
export const fetchFriendRequest = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-friends-request", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        dispatch(
          slice.actions.updateFriendRequest({
            friendRequest: response.data.data,
          })
        );
      })
      .catch((error) => console.log(error));
  };
};

export const SelectConversation = ({ room_id }) => {
  return (dispatch, getState) => {
    dispatch(slice.actions.selectConversation({ room_id }));
  };
};
