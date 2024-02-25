import { Box, IconButton, Stack, Typography, Avatar, Divider, Button } from '@mui/material'
import React from 'react'
import { useTheme } from "@mui/material/styles"
import { Phone, X, VideoCamera, CaretRight, Star, Bell, Prohibit, Trash } from 'phosphor-react'
import { useDispatch } from 'react-redux'
import { ToggleSidebar } from '../redux/slices/app'
import { faker } from '@faker-js/faker'
import AntSwitch from "./AntSwitch"
import SimpleBar from "simplebar-react";

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box sx={{ widht: "320px", minWidth: "320px", height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box sx={{
          boxShadow: "0px 0px 2px rgba(0 0 0 0.25)",
          width: "100%",
          height: "70px",
          backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background
        }}>
          <Stack sx={{ height: "100%", p: 2 }} direction="row" alignItems={"center"} justifyContent={"space-between"}>
            <Typography variant="subtitle2">
              Contact Info
            </Typography>
            <IconButton onClick={() => dispatch(ToggleSidebar())}>
              <X />
            </IconButton>
          </Stack>
        </Box>
        {/* body */}
        <SimpleBar style={{ height: "calc(100vh - 70px)" }}>
          <Stack sx={{ height: "100%", position: "relative", flexGrow: 1 }} p={3} spacing={3}>
            {/* user name , image, contact */}
            <Stack alignItems={"center"} spacing={3} direction={"row"}>
              <Avatar src={faker.image.avatar()} alt={faker.name.firstName()} sx={{ height: 64, width: 64 }} />
              <Stack spacing={0.5}>
                <Typography variant='article' fontWeight="600">{faker.name.firstName()}</Typography>
                <Typography variant='body2' fontWeight='500'>+91 9518147822</Typography>
              </Stack>
            </Stack>
            {/* Vedio or voice call */}
            <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
              <Stack alignItems='center' spacing={1}>
                <IconButton>
                  <Phone />
                </IconButton>
                <Typography variant='overline'>Voice</Typography>
              </Stack>
              <Stack alignItems='center' spacing={1}>
                <IconButton>
                  <VideoCamera />
                </IconButton>
                <Typography variant='overline'>Vedio</Typography>
              </Stack>
            </Stack>
            <Divider />
            {/* About */}
            <Stack spacing={0.5}>
              <Typography variant='article'>About</Typography>
              <Typography variant='body2'>Hi there, I am using.</Typography>
            </Stack>
            <Divider />
            {/* Media header */}
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='subtitle2'>
                Media, Docs and Link
              </Typography>
              <Button endIcon={<CaretRight />}>402</Button>
            </Stack>
            {/* Media previews */}
            <Stack direction='row' spacing={2} alignItems='center'>
              <Box sx={{ height: "60px", width: "100%", background: "grey" }}>
                {/* <img src={faker.image.animals()} alt={faker.name.fullName()} /> */}
              </Box>
              <Box sx={{ height: "60px", width: "100%", background: "grey" }}>
                {/* <img src={faker.image.animals()} alt={faker.name.fullName()} /> */}
              </Box>
              <Box sx={{ height: "60px", width: "100%", background: "grey" }}>
                {/* <img src={faker.image.animals()} alt={faker.name.fullName()} /> */}
              </Box>
            </Stack>
            <Divider />
            {/* Stared message */}
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Stack direction='row' alignItems='center' spacing={2}>
                <Star size={21} />
                <Typography variant='subtitle2'>Starred messages</Typography>
              </Stack>
              <IconButton>
                <CaretRight />
              </IconButton>
            </Stack>
            <Divider />
            {/* Mute Notification */}
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Stack direction='row' alignItems='center' spacing={2}>
                <Bell size={21} />
                <Typography variant='subtitle2'>
                  Mute Notification
                </Typography>
              </Stack>
              <AntSwitch />
            </Stack>
            <Divider />
            {/* Common group */}
            <Typography variant='caption'>1 group in common</Typography>
            <Stack alignItems={"center"} spacing={3} direction={"row"}>
              <Avatar src={faker.image.avatar()} alt={faker.name.firstName()} sx={{ height: 64, width: 64 }} />
              <Stack spacing={0.5}>
                <Typography variant='subtitle2'>Coding Monk</Typography>
                <Typography variant='caption' fontWeight='500'>Dog, Owl, Parrot, You</Typography>
              </Stack>
            </Stack>
            {/*  */}
            <Stack direction='row' alignItems='center' justifyContent={"center"} spacing={2} sx={{ width: "100%" }}>
              <Button startIcon={<Prohibit />} fullwidth variant='outlined'>
                Block
              </Button>
              <Button startIcon={<Trash />} fullwidth variant='outlined'>
                Delete
              </Button>
            </Stack>
          </Stack>
        </SimpleBar>
      </Stack>
    </Box>
  )
}

export default Contact