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
import {
  Bell,
  CaretLeft,
  Image,
  Info,
  Key,
  Keyboard,
  Lock,
  Note,
  PencilCircle,
} from "phosphor-react";
import { faker } from "@faker-js/faker";
import Shortcuts from "../../sections/settings/Shortcuts";
import { useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const Settings = () => {
  const theme = useTheme();
  const [shortcutDialog, setShortcutDialog] = useState(false);
  const Setting_list = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notifiaction",
      onclick: () => {},
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onclick: () => {},
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onclick: () => {},
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      onclick: () => {},
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onclick: () => {},
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: "Request Account Info",
      onclick: () => {},
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      onclick: () => {
        setShortcutDialog(true);
      },
    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: "Help",
      onclick: () => {},
    },
  ];
  return (
    <div>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left Pannel */}
        <Box
          sx={{
            height: "100vh",
            width: 320,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            boxShadow: "0px 0px 2px rgba(0 0 0 0.25)",
          }}
        >
          <Stack p={3} spacing={3}>
            {/* Header */}
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={3}
              sx={{ height: "40px" }}
            >
              <IconButton>
                <CaretLeft size={24} color="#4B4B4B" />
              </IconButton>
              <Typography variant="h6">Settings</Typography>
            </Stack>
            {/* Profile */}
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={3}
              sx={{ height: "80px" }}
            >
              <Avatar
                sx={{ height: 56, width: 56 }}
                src={faker.image.avatar()}
                alt={faker.name.fullName()}
              />
              <Stack spacing={0.5}>
                <Typography variant="article">
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="body2">{faker.random.words()}</Typography>
              </Stack>
            </Stack>
            <SimpleBar style={{ height: "calc(100vh - 220px)" }}>
              {/* Option */}
              <Stack spacing={4}>
                {Setting_list.map(({ icon, key, onclick, title }) => {
                  return (
                    <Stack
                      key={key}
                      sx={{ cursor: "pointer" }}
                      spacing={2}
                      onClick={() => onclick()}
                    >
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                      >
                        {icon}
                        <Typography variant="body2">{title}</Typography>
                      </Stack>
                      {key !== 7 && <Divider />}
                    </Stack>
                  );
                })}
              </Stack>
            </SimpleBar>
          </Stack>
        </Box>
        {/* Right Pannel */}
      </Stack>
      {shortcutDialog && (
        <Shortcuts open={shortcutDialog} setOpen={setShortcutDialog} />
      )}
    </div>
  );
};

export default Settings;
