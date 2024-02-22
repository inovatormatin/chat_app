import React from "react";
import { Chat_History } from "../../data";
import { Box, Stack } from "@mui/material";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  TimeLine,
} from "./MsgTypes";

const Message = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((el, idx) => {
          switch (el.type) {
            case "divider":
              // TimeLine
              return <TimeLine key={idx} el={el} />;

            case "msg":
              switch (el.subtype) {
                case "img":
                  // For image
                  return <MediaMsg key={idx} el={el} />;
                case "doc":
                  // For doc
                  return <DocMsg key={idx} el={el} />;
                case "link":
                  // For link
                  return <LinkMsg key={idx} el={el} />;
                case "reply":
                  // For reply msg
                  return <ReplyMsg key={idx} el={el} />;
                default:
                  // For normal text
                  return <TextMsg key={idx} el={el} />;
              }
            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
