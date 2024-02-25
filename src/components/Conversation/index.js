import React from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import SimpleBar from "simplebar-react";

const Conversation = () => {
  return (
    <Stack height={"100vh"} maxHeight={"100vh"} width={"auto"}>
      {/* Chat header */}
      <Header />
      {/* Msg */}
      <SimpleBar style={{ height: "calc(100vh - 145px)" }}>
        <Box sx={{ width: "100%", flexGrow: 1 }}>
          <Message menu={true}/>
        </Box>
      </SimpleBar>
      {/* Chat Footer */}
      <Footer />
    </Stack>
  );
};

export default Conversation;
