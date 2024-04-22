import React from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import { faker } from "@faker-js/faker";
import StyledBadge from "../../components/StyledBadge";
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { friend } = useSelector((state) => state.conversation.direct_chat);
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        height: "70px",
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ width: "100%", height: "100%" }}
      >
        {friend !== null && (
          <Stack
            onClick={() => dispatch(ToggleSidebar())}
            direction={"row"}
            alignItems={"center"}
            spacing={2}
          >
            {/* Profile Image */}
            <Box>
              {friend.status === "Online" ? (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                  sx={{ height: 1 }}
                >
                  <Avatar src={faker.image.avatar()} alt={friend.firstName} />
                </StyledBadge>
              ) : (
                <Avatar src={faker.image.avatar()} alt={friend.firstName} />
              )}
            </Box>
            {/* Name and status */}
            <Stack>
              <Typography variant="subtitle2">{`${friend.firstName} ${friend.lastName}`}</Typography>
              <Typography variant="caption">{friend.status}</Typography>
            </Stack>
          </Stack>
        )}
        <Stack direction={"row"} alignItems={"center"} spacing={3}>
          <IconButton>
            <VideoCamera />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
          <IconButton>
            <MagnifyingGlass />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <CaretDown />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
