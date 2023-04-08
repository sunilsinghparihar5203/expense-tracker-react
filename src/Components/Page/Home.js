import React, { useContext, useState, useCallback } from "react";
import { Switch, Route, useRouteMatch,useHistory } from "react-router-dom";
import { AuthContext } from "../../Store/Context";
import Header from "../Layout/Header";
import UpdateProfile from "./UpdateProfile";
import AddExpence from "../Expence/AddExpence";
import ExpencesContainer from "../Expence/ExpencesContainer";
import { useSelector,useDispatch } from "react-redux";
import { expenseAction } from "../../Store/Expenses";
function Home() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => !!state.auth.tokenId)
  const username = useSelector((state) => state.auth.email).split('@')[0]

  const history = useHistory();
  const match = useRouteMatch();
  const [isLoading, setisLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  
  const [UpdateValues, setUpdateValues] = useState(null);
  if (!isLoggedIn) {
    history.push("/login");
  }

  const fetchExpences = async () => {
    const response = await fetch(
      `https://expense-tracker-e9e2b-default-rtdb.asia-southeast1.firebasedatabase.app/expences/${username}.json`
    );
    setisLoading(false);
    if (response.ok) {
      const data = await response.json();
      dispatch(expenseAction.addExpense(data))
      dispatch(expenseAction.totalExpense(data))
      dispatch(expenseAction.activePremium(data))
      console.log({ datafetch: data });
      return data;
    } else {
      return response.ok;
    }
  };

  const DeleteExpence = async (id) => {
    const response = await fetch(
      `https://expense-tracker-e9e2b-default-rtdb.asia-southeast1.firebasedatabase.app/expences/expences/${username}/${id}.json`,
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
      `https://expense-tracker-e9e2b-default-rtdb.asia-southeast1.firebasedatabase.app/expences/${username}/${item.id}.json`,
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
