import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import logo from "../../assets/Images/logo.webp";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return <Navigate to="/app" />;
  }
  return (
    <>
      <Stack
        justifyContent={"center"}
        alignContent={"center"}
        sx={{ maxWidth: "1000px", height: "100vh", mx: "auto", p: 2 }}
      >
        <Stack spacing={5}>
          <Stack sx={{ width: "100%" }} alignItems="center" my={2}>
            <img style={{ height: 100 }} src={logo} alt="logo" />
          </Stack>
        </Stack>
        <Outlet />
      </Stack>
    </>
  );
};

export default MainLayout;
