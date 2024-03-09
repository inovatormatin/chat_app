import React from "react";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import logo from "../../assets/Images/logo.ico";
const MainLayout = () => {
  return (
    <>
      <Stack justifyContent={"center"} alignContent={"center"} sx={{maxWidth: "1000px", height:"100vh", mx:"auto", p:2 }}>
        <Stack spacing={5}>
          <Stack sx={{ width: "100%" }} alignItems="center">
            <img style={{ height: 120, width: 120 }} src={logo} alt="logo" />
          </Stack>
        </Stack>
        <Outlet />
      </Stack>
    </>
  );
};

export default MainLayout;
