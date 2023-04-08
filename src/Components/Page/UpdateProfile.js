import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../../Store/Auth";

function UpdateProfile() {
  const authStore = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [profilePhoto, setProfilePhoto] = useState(authStore.profilePicture);
  const [name, setName] = useState(authStore.displayName);

  const theme = useSelector((state) => state.theme.theme);
  const [isVarified, setisVarified] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fethData();
  }, [isVarified,authStore]);

  const fethData = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDcB1qwRdzv9rw43GzoG2AG1VVhKtmf-I0`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authStore.tokenId,
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
        setisVarified(data.users[0].emailVerified );
        console.log({ getDAta: data});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const profileSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDcB1qwRdzv9rw43GzoG2AG1VVhKtmf-I0`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authStore.tokenId,
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
        dispatch(authAction.setDisplayName(name));
        dispatch(authAction.setProfilePicture(profilePhoto));
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
          idToken: authStore.tokenId,
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
        alert("Verification mail sent.");
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
    <div className={`container py-4 py-4 bg-${theme}`} >
      <h1 className={`font-${theme}`}>User Details: </h1>
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
              value={profilePhoto}
              onChange={photoUrlHandler}
              required
            />
          </div>

          <div className="col-md-6 my-4">
            <button type="submit" className="btn btn-info " disabled={isLoading}>
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
          value={authStore.email}
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
