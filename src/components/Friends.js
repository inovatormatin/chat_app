import React from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import StyledBadge from "./StyledBadge";
import { socket } from "../socket";
import { Chat } from "phosphor-react";
import {
  FetchDirectConversation,
  UpdateChatRoom,
} from "../redux/slices/conversation";
import { useDispatch } from "react-redux";
import { SelectConversation } from "../redux/slices/app";

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const UserComponent = ({
  firstName,
  lastName,
  _id,
  status,
  synergy_status,
  img,
}) => {
  const theme = useTheme();
  const user_id = window.localStorage.getItem("user_id");
  const name = `${firstName} ${lastName}`;
  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2} alignItems="center">
          {/* Person Image */}
          {status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              sx={{ height: 1 }}
            >
              <Avatar src={img} alt={name} />
            </StyledBadge>
          ) : (
            <Avatar src={img} alt={name} />
          )}
          {/* Person name  */}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        {/* Time and msg count */}
        <Stack direction="row" spacing={2} alignItems={"center"}>
          {synergy_status === "sent" && (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  socket.emit("user:withdraw_friend_request", {
                    sender_id: user_id,
                    receiver_id: _id,
                  });
                }}
              >
                Revoke
              </Button>
              <Button variant="outlined">Pending</Button>
            </>
          )}
          {synergy_status === "received" && (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  socket.emit("user:accept_friend_request", {
                    receiver_id: _id,
                    sender_id: user_id,
                  });
                }}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  socket.emit("user:decline_friend_request", {
                    receiver_id: _id,
                    sender_id: user_id,
                  });
                }}
              >
                Decline
              </Button>
            </>
          )}
          {/* If user is unknown */}
          {synergy_status === "unknown" && (
            <Button
              onClick={() => {
                socket.emit("user:send_friend_request", {
                  sender_id: user_id,
                  receiver_id: _id,
                });
              }}
            >
              Send Request
            </Button>
          )}
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const FriendComponent = ({
  firstName,
  lastName,
  _id,
  status,
  img,
  handleClose,
}) => {
  const theme = useTheme();
  const user_id = window.localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const name = `${firstName} ${lastName}`;

  // start Conversation Handler
  const startConversation = () => {
    // start new conv.
    socket.emit(
      "chat:get_OTO_room_id",
      {
        client_id: user_id,
        friend_id: _id,
      },
      (res) => {
        socket.emit("chat:get_all_conversation", { user_id }, (data) => {
          // data => list of conversations
          dispatch(FetchDirectConversation({ conversations: data }));
          // set current convo.
          dispatch(
            SelectConversation({
              room_id: res._id,
              room_type: "individual",
            })
          );
        });
        socket.emit(
          "chat:get_OTO_chat_history",
          { client_id: user_id, room_id: res._id },
          (data) => {
            dispatch(
              UpdateChatRoom({
                current_convesation: data.conversation,
                friend: data.friend,
              })
            );
          }
        );
      }
    );
    handleClose();
  };
  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2} alignItems="center">
          {/* Person Image */}
          {status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              sx={{ height: 1 }}
            >
              <Avatar src={img} alt={name} />
            </StyledBadge>
          ) : (
            <Avatar src={img} alt={name} />
          )}
          {/* Person name  */}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        {/* Time and msg count */}
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <IconButton onClick={() => startConversation()}>
            <Chat />
          </IconButton>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const RequestComponent = ({ firstName, lastName, _id, status, img }) => {
  const theme = useTheme();
  const name = `${firstName} ${lastName}`;
  const user_id = window.localStorage.getItem("user_id");
  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2} alignItems="center">
          {/* Person Image */}
          {status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              sx={{ height: 1 }}
            >
              <Avatar src={img} alt={name} />
            </StyledBadge>
          ) : (
            <Avatar src={img} alt={name} />
          )}
          {/* Person name  */}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        {/* Time and msg count */}
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              socket.emit("user:accept_friend_request", {
                receiver_id: _id,
                sender_id: user_id,
              });
            }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              socket.emit("user:decline_friend_request", {
                receiver_id: _id,
                sender_id: user_id,
              });
            }}
          >
            Decline
          </Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export { UserComponent, FriendComponent, RequestComponent };
