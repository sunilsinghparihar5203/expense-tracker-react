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
  const [isUpdate, setIsUpdate] = useState(false);

  const [UpdateValues, setUpdateValues] = useState(null);

  console.log({ match: match });
  if (!authCtx.isLoggedIn) {
    history.push("/login");
  }
  console.log({ authCtx: authCtx });

  const fetchExpences = async () => {
    const response = await fetch(
      "https://expense-tracker-e9e2b-default-rtdb.asia-southeast1.firebasedatabase.app/expences.json"
    );
    setisLoading(false);
    if (response.ok) {
      const data = await response.json();
      setItems(data);
      console.log({ datafetch: data });
      return data;
    } else {
      return response.ok;
    }
  };

  const DeleteExpence = async (id) => {
    const response = await fetch(
      `https://expense-tracker-e9e2b-default-rtdb.asia-southeast1.firebasedatabase.app/expences/${id}.json`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log("deleted");
      fetchExpences();
    } else {
      console.log("There might be some error!");
    }
  };

  const UpdateExpence = async (item) => {
    const response = await fetch(
      `https://expense-tracker-e9e2b-default-rtdb.asia-southeast1.firebasedatabase.app/expences/${item.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          Price: item.Price,
          desc: item.desc,
          category: item.category,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setIsUpdate(false);
      fetchExpences();
      return data;
    } else {
      return response.ok;
    }
  };

  const invokeEditModal = (id, desc, price, category) => {
    setUpdateValues({ id: id, desc: desc, price: price, category: category });
    setIsUpdate(true);
  };

  return (
    <>
      <Header />
      <Switch>
        <Route path={`${match.path}add-expence`} exact>
          <AddExpence
            fetchExpences={fetchExpences}
            isLoading={isLoading}
            isUpdate={isUpdate}
            UpdateValues={UpdateValues}
            setIsUpdate={setIsUpdate}
            UpdateExpence={UpdateExpence}
          />
          <ExpencesContainer
            fetchExpences={fetchExpences}
            isLoading={isLoading}
            Items={Items}
            deleteExpence={DeleteExpence}
            invokeEditModal={invokeEditModal}
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
