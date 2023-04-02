import React, { useContext,useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Store/Context";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Header from "../Layout/Header";
import UpdateProfile from "./UpdateProfile";
import AddExpence from "../Expence/AddExpence";
import ExpencesContainer from "../Expence/ExpencesContainer";

const defaultExpences = [
  { id: "1", money: 100, desc: "this is for test", category: "Food" },
  { id: "2", money: 100, desc: "this is for test", category: "Food" },
  { id: "3", money: 100, desc: "this is for test", category: "Food" },
];

function Home() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const match = useRouteMatch();
  
  const [Items, setItem] = useState(defaultExpences)

  console.log({ match: match });
  if (!authCtx.isLoggedIn) {
    history.push("/login");
  }
  console.log({ authCtx: authCtx });

  const setItemsHandler = (item) =>{
    console.log("adding items.....")
    setItem((e)=> ([...e,item]))
  }

  return (
    <>
      <Header />

      <Switch>
        <Route path={`${match.path}add-expence`} exact>
          <AddExpence onaddItem = {setItemsHandler}/>
          <ExpencesContainer items={Items}/>
        </Route>
        <Route path={`${match.path}update-profile`} exact>
          <UpdateProfile />
        </Route>
      </Switch>
    </>
  );
}

export default Home;
