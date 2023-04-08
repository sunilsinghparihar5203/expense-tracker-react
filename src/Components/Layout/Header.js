import React from "react";
import { Link, NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../../Store/Auth";

import classes from "./Header.module.css";
function Header() {
  const dispatch = useDispatch();
  const isComplete = useSelector((state) => !!state.auth.displayName);
  const isActivePremium = useSelector((state) => state.expense.isActivePremium);

  const logOutHandler = () => {
    dispatch(authAction.logOut());
  };

  return (
    <div className={classes.Header}>
      <div>Welcome to expence tracker</div>
      <div className="d-flex">
        {isActivePremium && (
          <div className="px-4 mx-2 bg-warning text-white rounded-pill btn btn-sm">
            Active Premium
          </div>
        )}

        <div className="px-4 mx-2 bg-info rounded-pill btn btn-sm text-light">
          <NavLink to={"/add-expence"} className="nav-link">
            Add Expence
          </NavLink>
        </div>

        <div className="px-4 mx-2 bg-info rounded-pill  btn btn-sm text-light">
          <Link to={"/update-profile"} className="nav-link">
            {!isComplete ? <>Incomplete Profile</> : <>Update</>}
          </Link>{" "}
        </div>

        <div className="px-4 bg-danger rounded-pill btn btn-sm">
          <Link to={"/login"} onClick={logOutHandler} className="nav-link">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
