import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { CaretLeft } from 'phosphor-react'
import { UpdateSiderbarType } from '../redux/slices/app'
import SimpleBar from "simplebar-react";
import { DocMsg, LinkMsg } from './Conversation/MsgTypes'
import { Shared_docs, Shared_links } from '../data'

const SharedMessages = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleChange = (event, newval) => {
    setValue(newval)
  }
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
              Shared Messages
            </Typography>
          </Stack>
        </Box>
        <Box sx={{
          width: "100%",
          height: "50px",
        }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Media" />
            <Tab label="Links" />
            <Tab label="Docs" />
          </Tabs>
        </Box>
        {/* body */}
        <SimpleBar style={{ height: "calc(100vh - 120px)" }}>
          <Stack sx={{ height: "100%", position: "relative", flexGrow: 1 }} p={3}>
            {(() => {
              switch (value) {
                case 0:
                  // Media
                  return <Grid container spacing={2} p={2}>
                    {[0, 1, 2, 3, 4, 5, 6].map((el, idx) => {
                      return <Grid key={idx} item xs={4}>
                        <Box sx={{ height: "80px", background: "grey" }}>
                        </Box>
                      </Grid>
                    })}
                  </Grid>
                case 1:
                  // Link
                  return Shared_links.map((el, idx) => {
                    return <Box key={idx} sx={{ marginBottom: "10px" }}>
                      <LinkMsg el={el} menu={false} />
                    </Box>
                  })
                case 2:
                  // Docs
                  return Shared_docs.map((el, idx) => {
                    return <Box key={idx} sx={{ marginBottom: "10px" }}>
                      <DocMsg el={el} menu={false} />
                    </Box>
                  })
                default:
                  break;
              }
            })()}
          </Stack>
        </SimpleBar>
      </Stack>
    </Box>
  )
}

export default SharedMessages