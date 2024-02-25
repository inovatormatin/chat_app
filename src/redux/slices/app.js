import { createSlice } from "@reduxjs/toolkit";
// 
import { dispatch } from "../store";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT" // can be CONTACT, STARRED, SHARED
    }
};

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        // Toggle sidebar
        toggleSidebar(state, action) {
            state.sidebar.open = !state.sidebar.open;
        },
        // To select the type
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type;
        }
    }
});

// reducer
export default slice.reducer;

// --> actions

// ToggleSideBar
export const ToggleSidebar = () => {
    return async ()=> {
        dispatch(slice.actions.toggleSidebar())
    }
}

// UpdateSidebarType
export const UpdateSiderbarType = (type) => {
    return async ()=> {
        dispatch(slice.actions.updateSidebarType({
            type
        }))
    }
}