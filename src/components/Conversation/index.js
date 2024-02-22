import React from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Conversation = () => {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* Chat header */}
      <Header />
      {/* Msg */}
      <Box sx={{ width: "100%", flexGrow: 1 }}></Box>
      {/* Chat Footer */}
      <Footer />
    </Stack>
  );
};

export default Conversation;
