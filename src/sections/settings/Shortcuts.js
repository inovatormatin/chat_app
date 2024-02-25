import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Stack, Typography } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const list = [
  {
    key: 0,
    title: "Mark as unread",
    combination: ["Ctrl", "Shift", "U"]
  },
  {
    key: 1,
    title: "Archive Chat",
    combination: ["Ctrl", "Shift", "E"]
  },
  {
    key: 2,
    title: "Pin Chat",
    combination: ["Ctrl", "Shift", "P"]
  },
  {
    key: 3,
    title: "Search Chat",
    combination: ["Ctrl", "Shift", "F"]
  },
  {
    key: 4,
    title: "Next Chat",
    combination: ["Ctrl", "Tab"]
  },
  {
    key: 5,
    title: "Next Group",
    combination: ["Ctrl", "Shift", "N"]
  },
  {
    key: 6,
    title: "Mute",
    combination: ["Ctrl", "Shift", "M"]
  },
  {
    key: 7,
    title: "Delete Chat",
    combination: ["Ctrl", "Shift", "D"]
  },
  {
    key: 8,
    title: "Search",
    combination: ["Ctrl", "F"]
  },
  {
    key: 9,
    title: "New Chat",
    combination: ["Ctrl", "N"]
  },
  {
    key: 10,
    title: "Previous Chat",
    combination: ["Ctrl", "Shift", "Tab"]
  },
  {
    key: 11,
    title: "Profile & About",
    combination: ["Ctrl", "P"]
  },
];

const Shortcuts = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        keepMounted
        TransitionComponent={Transition}
        sx={{ p: 4 }}
      >
        <DialogTitle>Keyboard Shortcuts</DialogTitle>
        <DialogContent sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {list.map(({ key, title, combination }) => {
              return (
                <Grid key={key} container item xs={6}>
                  <Stack direction='row' sx={{ width: "100%" }} justifyContent={'space-between'} alignItems={"center"}>
                    <Typography variant='body2'>{title}</Typography>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      {combination.map((el, idx) => {
                        return (<Button size='small' key={idx} disabled variant='contained'>
                          {el}
                        </Button>);
                      })}
                    </Stack>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Shortcuts