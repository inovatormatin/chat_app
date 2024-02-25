import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { CaretLeft } from 'phosphor-react'
import { UpdateSiderbarType } from '../redux/slices/app'
import SimpleBar from "simplebar-react";
import Message from './Conversation/Message'


const StarredMessages = () => {
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
          <Stack sx={{ height: "100%", p: 2 }} direction="row" alignItems={"center"}>
            <IconButton onClick={() => dispatch(UpdateSiderbarType("CONTACT"))}>
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">
              Starred Messages
            </Typography>
          </Stack>
        </Box>
         {/* body */}
         <SimpleBar style={{ height: "calc(100vh - 70px)" }}>
          <Stack sx={{ height: "100%", position: "relative", flexGrow: 1 }} spacing={2}>
            <Message menu={false}/>
          </Stack>
        </SimpleBar>
      </Stack>
    </Box>
  )
}

export default StarredMessages