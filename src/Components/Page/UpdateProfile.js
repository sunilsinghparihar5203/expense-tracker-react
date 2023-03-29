import React, { useRef, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Store/Context";
import { Link } from "react-router-dom";

function UpdateProfile() {
  const authCtx = useContext(AuthContext);

  const [profilePhoto, setProfilePhoto] = useState(authCtx.profilePhoto);
  const [name, setName] = useState(authCtx.displayName);

  const [isVarified, setisVarified] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fethData = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDcB1qwRdzv9rw43GzoG2AG1VVhKtmf-I0`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.tokenId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setisVarified(data.emailVerified);
        console.log({ getDAta: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fethData();
  }, [isVarified]);

  const profileSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDcB1qwRdzv9rw43GzoG2AG1VVhKtmf-I0`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.tokenId,
          displayName: name,
          photoUrl: profilePhoto,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log({ res: res });
        if (res.ok) {
          console.log({ res: res });
          return res.json();
        } else {
          let errorMessgae = "updation failed";
          throw new Error(errorMessgae);
        }
      })
      .then((data) => {
        alert("Updated!");
        authCtx.setName(name);
        authCtx.setProfile(profilePhoto);
        console.log({ data: data });
      })
      .catch((err) => {
        alert(err);
        console.log({ err: err });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const varifyEmailHandler = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDcB1qwRdzv9rw43GzoG2AG1VVhKtmf-I0`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.tokenId,
          requestType: "VERIFY_EMAIL",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log({ res: res });
        return res.json();
      })
      .then((data) => {
        alert("Verification mail sent.")
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nameUrlHandler = (e) => {
    let name = e.target.value;
    setName(name);
  };
  const photoUrlHandler = (e) => {
    let photo = e.target.value;
    setProfilePhoto(photo);
  };

  return (
    <div className="container my-4">
      <h1>User Details: </h1>
      <form onSubmit={profileSubmitHandler}>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={nameUrlHandler}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="profilePhoto">Image Url</label>
            <input
              type="text"
              className="form-control"
              value={authCtx.profilePicture}
              onChange={photoUrlHandler}
              required
            />
          </div>

          <div className="col-md-6 my-4">
            <button type="submit" className="btn btn-info">
              {isLoading ? "Updating..." : "Submit"}
            </button>

            <Link to={"/"}>
              <button type="button" className="btn btn-danger mx-4">
                Cancle
              </button>
            </Link>
          </div>
        </div>
      </form>

      <div className="col-md-6">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          value={authCtx.email}
          id="email"
          readOnly
          required
        />
      </div>

      {!isVarified && (
        <div className="col-md-6 my-4">
          <button
            type="button"
            className="px-4 mx-2 rounded-pill bg-warning border-0"
            onClick={varifyEmailHandler}
          >
            Verify email
          </button>
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;
