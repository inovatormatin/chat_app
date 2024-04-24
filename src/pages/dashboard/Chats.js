import React, { useEffect, useState } from "react";
// import { ChatList } from "../../data";
import { useTheme } from "@mui/material/styles";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users,
} from "phosphor-react";
import ChatElement from "../../components/ChatElement";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyleInputBase,
} from "../../components/Search";
import Friends from "../../sections/main/Friends";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchDirectConversation,
  LastMessageByFriend,
  UpdateDirectConversation,
} from "../../redux/slices/conversation";

const Chats = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user_id = window.localStorage.getItem("user_id");
  const { direct_chat } = useSelector((state) => state.conversation);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const handleOpenDialogbox = () => {
    setOpenDialogBox(true);
  }; // to open the dilog box of users.
  const handleCloseDialogbox = () => {
    setOpenDialogBox(false);
  }; // to close the dilog box of users.

  useEffect(() => {
    socket.emit("chat:get_all_conversation", { user_id }, (data) => {
      // data => list of conversations
      dispatch(FetchDirectConversation({ conversations: data }));
    });
    // New message sent
    socket.on("chat:new_OTO_msg_sent", (data) => {
      console.log("new_OTO_msg_sent", data);
    });
    // New message recived
    socket.on("chat:new_OTO_msg_recieved", (data) => {
      console.log("new_OTO_msg_recieved", data);
      dispatch(UpdateDirectConversation(data.room_id, data.msg));
      dispatch(LastMessageByFriend(data.room_id, data.msg));
    });
    return () => {
      socket?.off("chat:new_OTO_msg_sent");
      socket?.off("chat:new_OTO_msg_recieved");
    };
    // eslint-disable-next-line
  }, [socket]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          {/* Heading */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                onClick={() => {
                  handleOpenDialogbox();
                }}
              >
                <Users />
              </IconButton>
              <IconButton>
                <CircleDashed />
              </IconButton>
            </Stack>
          </Stack>
          {/* Search bar */}
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color={"#709CE6"} />
              </SearchIconWrapper>
              <StyleInputBase placeholder="Search..." />
            </Search>
          </Stack>
          {/* Archive Button */}
          <Stack spacing={1}>
            <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
              <ArchiveBox size={24} />
              <Button>Archive</Button>
            </Stack>
            <Divider />
          </Stack>
          {/* Chat */}
          <SimpleBar style={{ height: "calc(100vh - 210px)" }}>
            <Stack direction={"column"} spacing={2} sx={{ flexGrow: 1 }}>
              {/* Pinned Chats */}
              {/* <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Pinned
                </Typography>
                {ChatList.filter((el) => el.pinned).map((el, index) => {
                  return <ChatElement key={index} {...el} />;
                })}
              </Stack> */}
              {/* All Chats */}
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  All Chats
                </Typography>
                {direct_chat.convesations
                  .filter((el) => !el.pinned)
                  .map((el, index) => {
                    return <ChatElement key={index} {...el} />;
                  })}
              </Stack>
            </Stack>
          </SimpleBar>
        </Stack>
      </Box>
      {openDialogBox && (
        <Friends open={openDialogBox} handleClose={handleCloseDialogbox} />
      )}
    </>
  );
};

export default Chats;
