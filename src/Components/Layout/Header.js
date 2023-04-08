import React from "react";
import { Link, NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../../Store/Auth";
import { themeAction } from "../../Store/Theme";

import classes from "./Header.module.css";
function Header() {
  const dispatch = useDispatch();
  const isComplete = useSelector((state) => !!state.auth.displayName);
  const isActivePremium = useSelector((state) => state.expense.isActivePremium);

  const showTheme = useSelector((state) => state.theme.showTheme);
  const theme = useSelector((state) => state.theme.theme);

  const logOutHandler = () => {
    dispatch(authAction.logOut());
  };

  const activePremiumHandler = () => {
    dispatch(themeAction.showTheme());
  };

  const themeHandler = () => {
    dispatch(themeAction.changeTheme(theme));
  };
  return (
    <div className={`${classes.Header} navbar-${theme}  bg-${theme} `} >
      <Link className="navbar-brand" to="/">Welcome to expence tracker</Link>
      <div className="d-flex">
        {isActivePremium && (
          <>
            <button
              className="px-4 mx-2 bg-warning text-white rounded-pill btn btn-sm"
              onClick={activePremiumHandler}
            >
              {!showTheme && "Active Premium"}
              {showTheme && "Activated"}
            </button>

            {showTheme && (
              <button
                className="px-4 mx-2 bg-warning text-white rounded-pill btn btn-sm"
                onClick={themeHandler}
              >
                {theme}
              </button>
            )}
          </>
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
