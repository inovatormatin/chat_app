import React from "react";
import { ChatList } from "../../data";
import { useTheme } from "@mui/material/styles";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import ChatElement from "../../components/ChatElement"
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

const Chats = () => {
  const theme = useTheme();
  return (
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
          <IconButton>
            <CircleDashed />
          </IconButton>
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
            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                Pinned
              </Typography>
              {ChatList.filter((el) => el.pinned).map((el, index) => {
                return <ChatElement key={index} {...el} />;
              })}
            </Stack>
            {/* All Chats */}
            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                All Chats
              </Typography>
              {ChatList.filter((el) => !el.pinned).map((el, index) => {
                return <ChatElement key={index} {...el} />;
              })}
            </Stack>
          </Stack>
        </SimpleBar>
      </Stack>
    </Box>
  );
};

export default Chats;
