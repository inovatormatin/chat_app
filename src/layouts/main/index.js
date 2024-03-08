import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Stack } from "@mui/material";
import logo from "../../assets/Images/logo.ico";
const MainLayout = () => {
  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Stack spacing={5}>
          <Stack sx={{ width: "100%" }} alignItems="center">
            <img style={{ height: 120, width: 120 }} src={logo} alt="logo" />
          </Stack>
        </Stack>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
