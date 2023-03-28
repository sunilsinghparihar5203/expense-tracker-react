import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Store/Context";
import { Route, useRouteMatch } from "react-router-dom";
import Header from "../Layout/Header";
import UpdateProfile from "./UpdateProfile";

function Home() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const match = useRouteMatch();
  console.log({match:match})
  if (!authCtx.isLoggedIn) {
    history.push("/login");
  }
  console.log({ authCtx: authCtx });

  return (
    <>
      <Header />

      <Route path={`${match.path}update-profile`} exact>
        <UpdateProfile />
      </Route>
    </>
  );
}

export default Home;
