import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenId: localStorage.getItem("token"),
  displayName: localStorage.getItem("displayName"),
  profilePicture: localStorage.getItem("profilePicture"),
  email: localStorage.getItem("email"),
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    logIn(state, action) {
      console.log({ action: action });
      state.tokenId = action.payload.tokenId;
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.profilePicture = action.payload.profilePicture;

      localStorage.setItem("token", action.payload.tokenId);
      localStorage.setItem("displayName", action.payload.displayName);
      localStorage.setItem("profilePicture", action.payload.profilePicture);
      localStorage.setItem("email", action.payload.email);
    },
    setEmail(state,action){
      state.email = action.payload;
      localStorage.setItem("email", action.payload);
    },
    setDisplayName(state,action){
      state.displayName = action.payload;
      localStorage.setItem("displayName", action.payload);
    },
    setProfilePicture(state,action){
      state.profilePicture = action.payload;
      localStorage.setItem("profilePicture", action.payload);
    },
    logOut(state) {
      state.tokenId = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("displayName");
      localStorage.removeItem("profilePicture");
      localStorage.removeItem("email");
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
