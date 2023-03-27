import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const emailRef = useRef();
  const passRef = useRef();
  const conformPassRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const saveUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const ConformPassword = conformPassRef.current.value;

    if (password !== ConformPassword) {
      alert("password not matching.");
      return;
    }

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcB1qwRdzv9rw43GzoG2AG1VVhKtmf-I0`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log(res);
          alert("New user Created");
          res.json();
        } else {
          let errorMessgae = " Authentication faild";
          throw new Error(errorMessgae);
        }
      })
      .catch((err) => {
        alert(err);
        console.log({ err: err });
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
          onSubmit={saveUser}
        >
          <h1 className="mb-4">SignUp</h1>
          <input
            type="email"
            className="form-control my-2"
            ref={emailRef}
            required
            placeholder="email"
          />
          <input
            type="password"
            className="form-control my-2"
            ref={passRef}
            required
            placeholder="Password"
          />
          <input
            type="password"
            className="form-control my-2"
            ref={conformPassRef}
            required
            placeholder="confirm Password"
          />

          {!isLoading && (
            <button type="submit" className="btn btn-info my-2">
              Submit
            </button>
          )}
          {isLoading && <p>Loading....</p>}

          <div className={`alert alert-dark`} role="alert">
            <Link to={"/login"}>Have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
