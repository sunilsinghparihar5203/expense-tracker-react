import React, { createContext } from "react";

export const AuthContext = createContext({
  tokenId: '',
  displayName:'',
  profilePicture:'',
  email:'',
  isLoggedIn: false,
  logIn: (token) => {},
  logOut: () => {},
  setEmail:(email)=>{},
  setName:(name)=>{},
  setProfile:(profile)=>{},
});
