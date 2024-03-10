import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyleInputBase,
} from "../../components/Search";
import { MagnifyingGlass } from "phosphor-react";
import { CallElement } from "../../components/CallElement";
import { membersList } from "../../data";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ p: 4 }}
    >
      {/* Title */}
      <DialogTitle mb={2}>Start Call</DialogTitle>
      {/* Content */}
      <DialogContent>
        {/* searchbar */}
        <Stack sx={{ width: "100%", mb: 2 }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color={"#709CE6"} />
            </SearchIconWrapper>
            <StyleInputBase placeholder="Search..." />
          </Search>
        </Stack>
        {/* Call list */}
        <SimpleBar style={{ height: "calc(100vh - 350px)" }}>
          <Stack direction={"column"} spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={2}>
              {membersList.map((el) => (
                <CallElement key={el.id} {...el} />
              ))}
            </Stack>
          </Stack>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
