import React, { useState } from "react";
import { AuthContext } from "./Context";

function AuthContextProvider(props) {
  const initialToken =localStorage.getItem("token")
  const initialName =localStorage.getItem("displayName")
  const initialProfile =localStorage.getItem("profilePicture")
  console.log({initialToken:initialToken,initialName:initialName,initialProfile:initialProfile})
  const [token, setToken] = useState(initialToken);
  const [displayName, SetDisplayName] = useState(initialName);
  const [profilePicture, SetProfilePicture] = useState(initialProfile);
  const loggedIn = !!token;

  const loginHandler = (token, name, profile) => {
    console.log("token setting");
    setToken(token);
    SetDisplayName(name);
    SetProfilePicture(profile);
  };

  const logoutHandler = () => {
    console.log("log out");
    setToken(null);
    localStorage.removeItem("userdata");
  };

  const authContextValues = {
    tokenId: token,
    isLoggedIn: loggedIn,
    displayName: displayName,
    profilePicture: profilePicture,
    logIn: loginHandler,
    logOut: logoutHandler,
  };
  return (
    <AuthContext.Provider value={authContextValues}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
