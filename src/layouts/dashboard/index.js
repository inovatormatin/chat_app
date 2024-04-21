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
const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
        dispatch(fetchFriendRequest());
        dispatch(fetchUsers());
        dispatch(showSnackbar({ severity: "info", message: data.msg }));
      });
      // Friend request witdrawn
      socket.on("app:friend_request_witdrawn", (data) => {
        dispatch(fetchFriendRequest());
        dispatch(fetchUsers());
      });
      // New friend request sent
      socket.on("app:new_friend_request_sent", (data) => {
        dispatch(fetchUsers());
        dispatch(showSnackbar({ severity: "success", message: data.msg }));
      });
      // Friend request approved
      socket.on("app:friend_request_approved", (data) => {
        dispatch(fetchUsers());
        dispatch(showSnackbar({ severity: "success", message: data.msg }));
      });
      // Friend request rejected
      socket.on("app:friend_request_rejected", (data) => {
        dispatch(fetchUsers());
        dispatch(showSnackbar({ severity: "error", message: data.msg }));
      });
      // error handling.
      socket.on("connect_error", (err) => handleErrors(err));
      socket.on("connect_failed", (err) => handleErrors(err));
      socket.on("disconnect", (err) => handleErrors(err));
    }
    return () => {
      socket?.off("user:offline");
      socket?.off("user:online");
      socket?.off("app:new_friend_request_received");
      socket?.off("app:friend_request_witdrawn");
      socket?.off("app:new_friend_request_sent");
      socket?.off("app:friend_request_approved");
      socket?.off("app:friend_request_rejected");
      socket?.off("connect_error");
      socket?.off("connect_failed");
      socket?.off("disconnect");
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
