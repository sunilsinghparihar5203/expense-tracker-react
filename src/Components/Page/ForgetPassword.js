import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ForgetPassword() {
  const emailRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const ForgetPasswordHandler = (e) => {
    const email = emailRef.current.value;
    e.preventDefault();
    setIsLoading(true);
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDcB1qwRdzv9rw43GzoG2AG1VVhKtmf-I0`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log({ resetPassdata: data });
        alert("Password reset link sent.");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="container ">
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <form
          className="col-md-4 text-center shadow-sm p-3 bg-white rounded"
          onSubmit={ForgetPasswordHandler}
        >
          <h1 className="mb-4">Forget Password</h1>
          <p>Enter the email which you have registred.</p>
          <input
            type="email"
            className="form-control my-2"
            ref={emailRef}
            required
            placeholder="email"
          />
          {!isLoading && (
            <button type="submit" className="btn btn-info my-2">
              Submit
            </button>
          )}
          {isLoading && <p>Submiting...</p>}
          <div className={`alert`} role="alert">
            <Link to={"/login"}>Already a user? Login.</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
