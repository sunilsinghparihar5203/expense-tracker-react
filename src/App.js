import React from "react";
import Signup from "./Components/Page/Signup";
import Login from "./Components/Page/Login";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Page/Home";
function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
