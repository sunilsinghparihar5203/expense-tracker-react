import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const login = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = emailRef.current.value;
    const password = passRef.current.value;

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=key=AIzaSyDcB1qwRdzv9rw43GzoG2AG1VVhKtmf-I0`,
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
        console.log({ res: res });
        res.json();
        if (res.ok) {
          console.log(res);
          alert("user Logged in");
          res.json();
        } else {
          let errorMessgae = "Authentication faild";
          throw new Error(errorMessgae);
        }
      }).then((data)=>{
        console.log({data:data})
      }).catch((err) => {
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
          onSubmit={login}
        >
          <h1 className="mb-4">Login</h1>
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
          {!isLoading && (
            <button type="submit" className="btn btn-info my-2">
              login
            </button>
          )}
          {isLoading && <p>Loging...</p>}

          <div className={`alert alert-dark`} role="alert">
            <Link to={"/signup"}>Want to create new account? signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;