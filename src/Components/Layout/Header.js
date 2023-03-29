import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Store/Context";

import classes from "./Header.module.css";
function Header() {
  const authCtx = useContext(AuthContext);
  const isComplete = !authCtx.displayName;
  return (
    <div className={classes.Header}>
      <div>Welcome to expence tracker</div>
      <div>
        {isComplete && <>Your profile is incomplete.</>}{" "}
        <Link to={"/update-profile"}>
          {isComplete && <>Complete now.</>}
          {!isComplete && <>Update</>}
        </Link>{" "}
        {!isComplete && (
          <Link to={"/login"} onClick={authCtx.logOut}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
