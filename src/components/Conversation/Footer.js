import React, { useState } from "react";
import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,
} from "phosphor-react";
import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import {
  LastMessageByFriend,
  UpdateDirectConversation,
} from "../../redux/slices/conversation";

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Vedio",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Sticker",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#0d539b",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
];
const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
  "& .MuiInputBase-root": {
    borderRadius: "8px",
  },
}));

const ChatInput = ({
  setOpenPicker,
  userInput,
  setUserInput,
  sendMessageHandler,
}) => {
  const [openActions, setOpenActions] = useState(false);
  return (
    <StyledInput
      fullWidth
      placeholder="Write message ..."
      variant="filled"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      onFocus={() => setOpenPicker(false)}
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          sendMessageHandler();
        }
      }}
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack
            sx={{
              width: "max-content",
              height: "30px",
            }}
          >
            <Stack
              sx={{
                position: "relative",
                display: openActions ? "inline-block" : "none",
              }}
            >
              {Actions.map((el, index) => {
                return (
                  <Tooltip key={index} title={el.title} placement={"right"}>
                    <Fab
                      sx={{
                        backgroundColor: el.color,
                        position: "absolute",
                        top: -el.y,
                      }}
                    >
                      {el.icon}
                    </Fab>
                  </Tooltip>
                );
              })}
            </Stack>
            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                  setOpenActions((prev) => !prev);
                }}
              >
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setOpenPicker((prev) => !prev);
              }}
            >
              <Smiley />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const Footer = () => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);
  const [userInput, setUserInput] = useState("");
  const user_id = window.localStorage.getItem("user_id");
  const { friend } = useSelector((state) => state.conversation.direct_chat);
  const { room_id } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  // To send message
  const sendMessageHandler = () => {
    if (userInput !== "") {
      // { client_id, room_id, msg }
      let msg = {
        to: friend._id,
        from: user_id,
        type: "Text", // "Text", "Media", "Document", "Link"
        text: userInput,
      };
      socket.emit("chat:send_OTO_msg", { client_id: user_id, room_id, msg }); // emit the event.
      dispatch(UpdateDirectConversation(room_id, msg));
      dispatch(LastMessageByFriend(room_id, msg));
      setUserInput("");
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        height: "75px",
      }}
      p={2}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Stack sx={{ width: "100%" }}>
          <Box
            sx={{
              display: openPicker ? "inline" : "none",
              position: "fixed",
              right: 80,
              bottom: 75,
              zIndex: 10,
            }}
          >
            <Picker
              theme={theme.palette.mode}
              data={data}
              onEmojiSelect={(e) => setUserInput(userInput + e.native)}
            />
          </Box>
          <ChatInput
            setOpenPicker={setOpenPicker}
            userInput={userInput}
            setUserInput={setUserInput}
            sendMessageHandler={sendMessageHandler}
          />
        </Stack>
        <Box
          height={48}
          width={48}
          sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
          }}
        >
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ width: "100%", height: "100%" }}
          >
            <IconButton onClick={() => sendMessageHandler()}>
              <PaperPlaneTilt color="#fff" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
