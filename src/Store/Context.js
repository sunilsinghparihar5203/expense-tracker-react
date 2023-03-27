import React, { createContext } from "react";

export const AuthContext = createContext({
  tokenId: '',
  isLoggedIn: false,
  logIn: (token) => {},
  logOut: () => {},
});
