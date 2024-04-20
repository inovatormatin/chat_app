import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

const initialState = {
  direct_chat: {
    convesations: [],
    current_convesation: null,
    current_messages: [],
  },
  group_chat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversation(state, action) {
      const user_id = window.localStorage.getItem("user_id");
      const list = action.payload.conversation.map((el) => {
        const this_user = el.participants.find(
          (elm) => elm._id.toStrin() !== user_id
        );
        // making data according requirement
        return {
          id: el._id,
          user_id: this_user._id,
          name: `${this_user.firstName} ${this_user.lastName}`,
          online: this_user.status === "Online",
          img: faker.image.avatar(),
          msg: faker.music.songName(),
          time: "9:36",
          unread: 0,
          pinned: false,
        };
      });
      state.direct_chat.convesations = list;
    },
    updateDirectConversation(state, action) {
      const user_id = window.localStorage.getItem("user_id");
      const this_conversation = action.payload.convesations;
      state.direct_chat.convesations = state.direct_chat.convesations.map(
        (el) => {
          if (el.id !== this_conversation._id) {
            console.log("1. ----->", { this_conversation, el });
            return el;
          } else {
            const user = this_conversation.participants.find(
              (elm) => elm._id.toString() !== user_id
            );
            console.log("2. ----->", { this_conversation, user });
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
      console.log("here ----->", { this_conversation, user, user_id });

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

export const FetchDirectConversation = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.fetchDirectConversation({
        conversations,
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
