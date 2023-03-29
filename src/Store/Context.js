import React, { createContext } from "react";

export const AuthContext = createContext({
  tokenId: '',
  displayName:'',
  profilePicture:'',
  isLoggedIn: false,
  logIn: (token) => {},
  logOut: () => {},
});
