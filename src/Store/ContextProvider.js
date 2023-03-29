import React, { useState } from "react";
import { AuthContext } from "./Context";

function AuthContextProvider(props) {
  const initialToken = localStorage.getItem("token");
  const initialName = localStorage.getItem("displayName");
  const initialProfile = localStorage.getItem("profilePicture");
  const initialEmail = localStorage.getItem("email");
  console.log({
    initialToken: initialToken,
    initialName: initialName,
    initialProfile: initialProfile,
  });
  const [token, setToken] = useState(initialToken);
  const [displayName, SetDisplayName] = useState(initialName);
  const [profilePicture, SetProfilePicture] = useState(initialProfile);
  const [email, SetEmail] = useState(initialEmail);
  const loggedIn = !!token;

  const loginHandler = (token, name, profile, email) => {
    console.log({ token: token, name: name, profile: profile, email: email });
    setToken(token);
    SetDisplayName(name ? name : "");
    SetProfilePicture(profile ? profile : "");
    SetEmail(email ? email : "");
  };

  const logoutHandler = () => {
    console.log("log out");
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("email");
  };

  const setEmail = (email) => {
    SetEmail(email);
  };
  const setName = (name) => {
    SetDisplayName(name);
  };
  const setProfile = (profile) => {
    SetProfilePicture(profile);
  };

  const authContextValues = {
    tokenId: token,
    isLoggedIn: loggedIn,
    displayName: displayName,
    email: email,
    profilePicture: profilePicture,
    logIn: loginHandler,
    logOut: logoutHandler,
    setEmail: setEmail,
    setName: setName,
    setProfile: setProfile,
  };
  return (
    <AuthContext.Provider value={authContextValues}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
