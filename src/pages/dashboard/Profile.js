import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import { CaretLeft } from "phosphor-react";
import ProfileForm from "../../sections/ProfileForm";

const Profile = () => {
  // const theme = useTheme();
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left pannel */}
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
          <Stack p={4} spacing={5}>
            {/* Header */}
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <IconButton>
                <CaretLeft size={24} color="#4B4B4B" />
              </IconButton>
              <Typography variant="h6">Profile</Typography>
            </Stack>
            {/* Profile Form */}
            <ProfileForm />
          </Stack>
        </Box>
        {/* Right Pannel */}
      </Stack>
    </>
  );
};

export default Profile;
