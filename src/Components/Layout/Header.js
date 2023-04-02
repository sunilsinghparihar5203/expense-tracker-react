import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Store/Context";

import classes from "./Header.module.css";
function Header() {
  const authCtx = useContext(AuthContext);
  const isComplete = authCtx.displayName.length > 0 ? true : false;
  return (
    <div className={classes.Header}>
      <div>Welcome to expence tracker</div>
      <div className="d-flex">
       <div className="px-4 mx-2 rounded-pill "  >
          <NavLink to={"/add-expence"} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Add Expence</NavLink>
        </div> 

        <div className="px-4 mx-2 bg-info rounded-pill">
          {!isComplete && <>Your profile is incomplete.</>}{" "}
          <Link to={"/update-profile"}>
            {!isComplete ? <>Complete now.</> : <>Update</>}
          </Link>{" "}
        </div> 

        <div className="px-4 bg-warning rounded-pill">
          <Link to={"/login"} onClick={authCtx.logOut}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
