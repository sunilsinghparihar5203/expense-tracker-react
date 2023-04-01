import React from "react";
import Signup from "./Components/Page/Signup";
import Login from "./Components/Page/Login";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Page/Home";
import ForgetPassword from "./Components/Page/ForgetPassword";

function App() {
  return (
    <Switch>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/forget-password">
        <ForgetPassword />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
