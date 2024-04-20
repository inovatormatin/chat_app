import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import {
  fetchFriendRequest,
  fetchUsers,
  showSnackbar,
} from "../../redux/slices/app";
// import { SelectConversation, showSnackbar } from "../../redux/slices/app";
// import {
//   AddDirectConversation,
//   UpdateDirectConversation,
// } from "../../redux/slices/conversation";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const { convesations } = useSelector(
  //   (state) => state.conversation.direct_chat
  // );
  const user_id = window.localStorage.getItem("user_id");
  const handleErrors = (err) => {
    console.log("Socket Error", err);
  };

  useEffect(() => {
    if (isLoggedIn) {
      connectSocket(user_id);
      // Listen user offline status
      socket.on("user:offline", (data) => {
        console.log("offline status", data);
      });
      // Listen user online status
      socket.on("user:online", (data) => {
        console.log("online status", data);
      });
      // New friend request received
      socket.on("app:new_friend_request_received", (data) => {
        console.log("New Friend Req.", data);
        dispatch(fetchFriendRequest());
        dispatch(showSnackbar({ severity: "info", message: data.msg }));
      });
      // New friend request sent
      socket.on("app:new_friend_request_sent", (data) => {
        console.log("New Friend Req.", data);
        dispatch(fetchUsers());
        dispatch(showSnackbar({ severity: "success", message: data.msg }));
      });
      // error handling.
      socket.on("connect_error", (err) => handleErrors(err));
      socket.on("connect_failed", (err) => handleErrors(err));
      socket.on("disconnect", (err) => handleErrors(err));
    }
    return () => {
      socket?.off("user:offline");
      socket?.off("user:online");
    };
    // eslint-disable-next-line
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction={"row"}>
      {/* Sidebar */}
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
