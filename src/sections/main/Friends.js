import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFriendRequest,
  fetchFriends,
  fetchUsers,
} from "../../redux/slices/app";

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; // handling the tabs.
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
                  case 1: // displey all friends
                    return <FriendList />;
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
        return <></>;
      })}
    </>
  );
};

// Friend List
const FriendList = () => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]); // fetching friends list
  return (
    <>
    {console.log(friends)}
      {friends.map((el, idx) => {
        return <></>;
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
        return <></>;
      })}
    </>
  );
};
