import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  showTheme: false,
};

const themeSlice = createSlice({
  name: "Theme",
  initialState: initialState,
  reducers: {
    changeTheme(state, action) {
      if (action.payload === "dark") {
        state.theme = "light";
      } else {
        state.theme = "dark";
      }
    },
    showTheme(state) {
      state.showTheme = !state.showTheme;
    },
  },
});

export const themeAction = themeSlice.actions;
export default themeSlice.reducer;
