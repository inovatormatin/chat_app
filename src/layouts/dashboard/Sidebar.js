import {
  Avatar,
  Box,
  Divider,
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/AntSwitch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOutUser } from "../../redux/slices/auth";

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getPath = (index) => {
    switch (index) {
      case 0:
        return "/profile";
      case 1:
        return "/settings";
      case 2:
        dispatch(LogOutUser());
        return "/auth/login";
      default:
        break;
    }
  };
  return (
    <Box
      p={2}
      sx={{
        background: theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0, 0.25)",
        height: "100vh",
        width: 100,
      }}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        height={"100%"}
        justifyContent={"space-between"}
        spacing={2}
      >
        <Stack alignItems={"center"} spacing={4}>
          {/* logo */}
          <Box
            sx={{
              background: theme.palette.primary.main,
              height: 64,
              width: 64,
              borderRadius: 2.5,
            }}
          >
            <img src={Logo} alt="logo" />
          </Box>
          {/* Nav icons */}
          <Stack
            sx={{ width: "max-content" }}
            direction={"column"}
            alignItems={"center"}
            spacing={2}
          >
            {Nav_Buttons.map((el, index) => {
              return el.index === selected ? (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    key={el.index}
                    sx={{ width: "max-content", color: "#fff" }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelected(el.index);
                    navigate(el.path);
                  }}
                  key={el.index}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#000"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              );
            })}
            {/* divider */}
            <Divider sx={{ width: "48px" }} />
            {selected === 3 ? (
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
              >
                <IconButton sx={{ width: "max-content", color: "#fff" }}>
                  <Gear />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                sx={{
                  width: "max-content",
                  color:
                    theme.palette.mode === "light"
                      ? "#000"
                      : theme.palette.text.primary,
                }}
                onClick={() => {
                  setSelected(3);
                  navigate("/settings");
                }}
              >
                <Gear />
              </IconButton>
            )}
          </Stack>
        </Stack>

        <Stack alignItems={"center"} spacing={4}>
          <AntSwitch
            onChange={() => {
              onToggleMode();
            }}
            defaultChecked
          />
          <Avatar
            src={faker.image.avatar()}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el, index) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleClose();
                      navigate(getPath(index));
                    }}
                  >
                    <Stack
                      width={100}
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <span>{el.title}</span> {el.icon}
                    </Stack>
                  </MenuItem>
                );
              })}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Sidebar;
