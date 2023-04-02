import React, { useContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Store/Context";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Header from "../Layout/Header";
import UpdateProfile from "./UpdateProfile";
import AddExpence from "../Expence/AddExpence";
import ExpencesContainer from "../Expence/ExpencesContainer";

function Home() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const match = useRouteMatch();

  const [Items, setItems] = useState({});
  const [isLoading, setisLoading] = useState(true);

  console.log({ match: match });
  if (!authCtx.isLoggedIn) {
    history.push("/login");
  }
  console.log({ authCtx: authCtx });

  const setItemsHandler = (item) => {
    console.log("adding items.....");
    setItems({ ...Items, item });
  };

  const fetchExpences = async () => {
    const response = await fetch(
      "https://expense-tracker-e9e2b-default-rtdb.asia-southeast1.firebasedatabase.app/expences.json"
    );
    setisLoading(false);
    if (response.ok) {
      const data = await response.json();
      setItems(data);
      console.log({ datafetch: data });
      // Object.keys(data).map(item=>{
      //   console.log({item:data[item].Price})
      // })
      return data;
    } else {
      return response.ok;
    }
  };

  return (
    <>
      <Header />
      <Switch>
        <Route path={`${match.path}add-expence`} exact>
          <AddExpence onaddItem={setItemsHandler} isLoading={isLoading} />
          <ExpencesContainer
            fetchExpences={fetchExpences}
            isLoading={isLoading}
            Items={Items}
          />
        </Route>
        <Route path={`${match.path}update-profile`} exact>
          <UpdateProfile />
        </Route>
      </Switch>
    </>
  );
}

export default Home;
