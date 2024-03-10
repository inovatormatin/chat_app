import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { MagnifyingGlass, Plus } from "phosphor-react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import ChatElement from "../../components/ChatElement"
import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyleInputBase,
} from "../../components/Search";
import { ChatList } from "../../data";
import CreateGroup from "../../sections/main/CreateGroup";

const Group = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false)
  const handleCloseOpenDialog = () => {
    setOpenDialog(false)
  }
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            width: 320,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            {/* Header */}
            <Stack>
              <Typography variant="h5">Groups</Typography>
            </Stack>
            {/* Saerchbar */}
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color={"#709CE6"} />
                </SearchIconWrapper>
                <StyleInputBase placeholder="Search..." />
              </Search>
            </Stack>
            {/* Create new chat */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2" component={Link}>
                Create New Group
              </Typography>
              <IconButton onClick={() => setOpenDialog(true)}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
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
        {/* Right */}
      </Stack>
      {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseOpenDialog}/>}
    </>
  );
};

export default Group;
