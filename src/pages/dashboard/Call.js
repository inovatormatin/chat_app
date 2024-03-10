import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { MagnifyingGlass, Plus } from "phosphor-react";
import SimpleBar from "simplebar-react";
import { CallLogElement } from "../../components/CallElement";
import { Call_logs } from "../../data";
import "simplebar-react/dist/simplebar.min.css";
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
import StartCall from "../../sections/main/StartCall";

const Call = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseOpenDialog = () => {
    setOpenDialog(false);
  };
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
              <Typography variant="h5">Calls</Typography>
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
                Start conversation
              </Typography>
              <IconButton onClick={() => setOpenDialog(true)}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            {/* Call History */}
            <SimpleBar style={{ height: "calc(100vh - 210px)" }}>
              <Stack direction={"column"} spacing={2} sx={{ flexGrow: 1 }}>
                {/* Pinned Chats */}
                <Stack spacing={2.4}>
                  {Call_logs.map((el) => (
                    <CallLogElement key={el.id} {...el} />
                  ))}
                </Stack>
              </Stack>
            </SimpleBar>
          </Stack>
        </Box>
        {/* Right */}
      </Stack>
      {openDialog && (
        <StartCall open={openDialog} handleClose={handleCloseOpenDialog} />
      )}
    </>
  );
};

export default Call;
