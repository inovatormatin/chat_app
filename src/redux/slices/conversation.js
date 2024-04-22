import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import moment from "moment";

const initialState = {
  direct_chat: {
    convesations: [],
    current_convesation: [],
    friend: null,
  },
  group_chat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversation(state, action) {
      const user_id = window.localStorage.getItem("user_id");
      console.log(action.payload.conversations);
      const list = action.payload.conversations.map((el) => {
        const this_user = el.participants.find(
          (elm) => elm._id.toString() !== user_id
        );
        // making data according requirement
        return {
          id: el._id,
          user_id: this_user._id,
          name: `${this_user.firstName} ${this_user.lastName}`,
          online: this_user.status === "Online",
          img: faker.image.avatar(),
          msg:
            el.lastMessage.text !== ""
              ? el.lastMessage.text
              : "Send Hi 👋 to new friend.",
          time: formatTime(el.lastMessage.createdAt),
          unread: 0,
          pinned: el.pinned,
        };
      });
      state.direct_chat.convesations = list;
    },
    updateChatRoom(state, action) {
      state.direct_chat.current_convesation =
        action.payload.current_convesation;
      state.direct_chat.friend = action.payload.friend;
      state.direct_chat.convesations = action.payload.direct_conversation;
    },
    updateDirectConversation(state, action) {
      const user_id = window.localStorage.getItem("user_id");
      const this_conversation = action.payload.convesations;
      state.direct_chat.convesations = state.direct_chat.convesations.map(
        (el) => {
          if (el.id !== this_conversation._id) {
            // console.log("1. ----->", { this_conversation, el });
            return el;
          } else {
            const user = this_conversation.participants.find(
              (elm) => elm._id.toString() !== user_id
            );
            // console.log("2. ----->", { this_conversation, user });
            return {
              id: this_conversation._id,
              user_id: user._id,
              name: `${user.firstName} ${user.lastName}`,
              online: user.status === "Online",
              img: faker.image.avatar(),
              msg: faker.music.songName(),
              time: "9:36",
              unread: 0,
              pinned: false,
            };
          }
        }
      );
    },
    addDirectConversation(state, action) {
      const user_id = window.localStorage.getItem("user_id");
      const this_conversation = action.payload.convesations;
      const user = this_conversation.participants.find(
        (elm) => elm._id.toString() !== user_id
      );
      // console.log("here ----->", { this_conversation, user, user_id });

      state.direct_chat.convesations.push({
        id: this_conversation._id,
        user_id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        online: user.status === "Online",
        img: faker.image.avatar(),
        msg: faker.music.songName(),
        time: "9:36",
        unread: 0,
        pinned: false,
      });
    },
  },
});

export default slice.reducer;

// to get all direct conversation list
export const FetchDirectConversation = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.fetchDirectConversation({
        conversations,
      })
    );
  };
};

// set Chat room data
export const UpdateChatRoom = ({ current_convesation, friend }) => {
  return async (dispatch, getState) => {
    console.log(getState().conversation.direct_chat.convesations);
    console.log(friend);
    let direct_conversation = getState().conversation.direct_chat.convesations;
    direct_conversation = direct_conversation.map((user) =>
      user.user_id === friend._id
        ? { ...user, online: friend.status === "Online" }
        : user
    );
    dispatch(
      slice.actions.updateChatRoom({
        current_convesation,
        friend,
        direct_conversation,
      })
    );
  };
};

// UpdateDirectConversation
export const UpdateDirectConversation = ({ convesations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDirectConversation({ convesations }));
  };
};
// AddDirectConversation
export const AddDirectConversation = ({ convesations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectConversation({ convesations }));
  };
};

// Date formatting
const formatTime = (date) => {
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");

  const momentDate = moment(date);

  if (momentDate.isSame(today, "d")) {
    // Today
    return momentDate.format("hh:mm A");
  } else if (momentDate.isSame(yesterday, "d")) {
    // Yesterday
    return "Yesterday";
  } else {
    // Older dates
    return momentDate.format("D MMM");
  }
};
