import React from "react";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import StyledBadge from "./StyledBadge";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation } from "../redux/slices/app";
import { UpdateChatRoom } from "../redux/slices/conversation";
import { socket } from "../socket";

const ChatElement = ({ id, img, name, msg, time, unread, pinned, online }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { room_id } = useSelector((state) => state.app);
  const user_id = window.localStorage.getItem("user_id");
  return (
    <Box
      onClick={() => {
        dispatch(SelectConversation({ room_id: id, room_type: "individual" }));
        socket.emit(
          "chat:get_OTO_chat_history",
          { client_id: user_id, room_id: id },
          (data) => {
            dispatch(
              UpdateChatRoom({
                current_convesation: data.conversation,
                friend: data.friend,
              })
            );
          }
        );
      }}
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor:
          room_id === id
            ? theme.palette.primary.main
            : theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.default,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2}>
          {/* Person Image */}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              sx={{ height: 1 }}
            >
              <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            </StyledBadge>
          ) : (
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
          )}
          {/* Person name / msg */}
          <Stack spacing={0.3}>
            <Typography
              color={room_id === id ? "#fff" : theme.palette.text.primary}
              variant="subtitle2"
            >
              {name}
            </Typography>
            <Typography
              color={room_id === id ? "#fff" : theme.palette.text.primary}
              variant="caption"
            >
              {msg}
            </Typography>
          </Stack>
        </Stack>
        {/* Time and msg count */}
        <Stack spacing={2} alignItems={"center"}>
          <Typography
            color={room_id === id ? "#fff" : theme.palette.text.primary}
            sx={{ fontWeight: 600 }}
            variant="caption"
          >
            {time}
          </Typography>
          <Badge color={"primary"} badgeContent={unread} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatElement;
