import React, { useRef, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import SimpleBar from "simplebar-react";
import { useSelector } from "react-redux";

const Conversation = () => {
  const simpleBarRef = useRef();
  const { current_convesation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  useEffect(() => {
    if (simpleBarRef.current) {
      simpleBarRef.current.getScrollElement().scrollTop =
        simpleBarRef.current.getScrollElement().scrollHeight;
    }
  }, [current_convesation]);
  return (
    <Stack height={"100vh"} maxHeight={"100vh"} width={"auto"}>
      {/* Chat header */}
      <Header />
      {/* Msg */}
      <SimpleBar style={{ height: "calc(100vh - 145px)" }} ref={simpleBarRef}>
        <Box sx={{ width: "100%", flexGrow: 1 }}>
          <Message menu={true} />
        </Box>
      </SimpleBar>
      {/* Chat Footer */}
      <Footer />
    </Stack>
  );
};

export default Conversation;
