import React, { useState } from "react";
import { AuthContext } from "./Context";

function AuthContextProvider(props) {
  const [token, setToken] = useState(null);
  const loggedIn = !!token;

  const loginHandler = (token) => {
    console.log("token setting")
    setToken(token);
  };

  const logoutHandler = () => {
    console.log("log out")
    setToken(null);
  };

  const authContextValues = {
    tokenId: token,
    isLoggedIn: loggedIn,
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
