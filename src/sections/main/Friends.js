import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFriendRequest,
  fetchFriends,
  fetchUsers,
  showSnackbar,
} from "../../redux/slices/app";
import {
  FriendComponent,
  RequestComponent,
  UserComponent,
} from "../../components/Friends";
import { socket } from "../../socket";

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; // handling the tabs.

  useEffect(() => {
    // Friend request withdrawn
    socket.on("user:revoked_friend_request", (data) => {
      dispatch(fetchUsers());
      dispatch(showSnackbar({ severity: "success", message: data.msg }));
    });

    // Accept friend request
    socket.on("user:accept_friend_request", (data) => {
      dispatch(fetchUsers());
      dispatch(showSnackbar({ severity: "success", message: data.msg }));
    });

    // Reject friend request
    socket.on("user:declined_friend_request", (data) => {
      dispatch(fetchUsers());
      dispatch(fetchFriendRequest());
      dispatch(showSnackbar({ severity: "success", message: data.msg }));
    });

    return () => {
      socket?.off("user:revoked_friend_request");
      socket?.off("user:accept_friend_request");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        keepMounted
        onClose={handleClose}
        sx={{ p: 4 }}
      >
        <Stack p={2} sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Explore" />
            <Tab label="Friends" />
            <Tab label="Requests" />
          </Tabs>
        </Stack>
        {/* Dilog content */}
        <DialogContent>
          <Stack sx={{ height: "100%" }}>
            <Stack spacing={2.5}>
              {(() => {
                switch (value) {
                  case 0: // display all users
                    return <UsersLists />;
                  case 1: // display all friends
                    return <FriendList handleClose={handleClose} />;
                  case 2: // display all friend req.
                    return <FriendReqList />;
                  default:
                    break;
                }
              })()}{" "}
              {/* IFEE - function -> conditionally reneder the components. */}
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Friends;

// All user list component
const UsersLists = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]); // fetching users list
  return (
    <>
      {users.map((el, idx) => {
        return <UserComponent key={el._id} {...el} />;
      })}
    </>
  );
};

// Friend List
const FriendList = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]); // fetching friends list
  return (
    <>
      {friends.map((el, idx) => {
        return (
          <FriendComponent key={el._id} {...el} handleClose={handleClose} />
        );
      })}
    </>
  );
};

// Friend Request List
const FriendReqList = () => {
  const dispatch = useDispatch();
  const { freindRequests } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(fetchFriendRequest());
  }, [dispatch]); // fetching friends requset list
  return (
    <>
      {freindRequests.map((el, idx) => {
        return <RequestComponent key={el._id} {...el} />;
      })}
    </>
  );
};
