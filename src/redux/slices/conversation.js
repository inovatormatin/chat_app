import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

const user_id = window.localStorage.getItem("user_id");

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
