import React, { useRef, useContext, useState } from "react";
import { AuthContext } from "../../Store/Context";

function UpdateProfile() {
  const nameRef = useRef();
  const profilePhotoRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const profileSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const name = nameRef.current.value;
    const profilePhoto = profilePhotoRef.current.value;
    console.log({ name: name, profilePhoto: profilePhoto });

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
        console.log({res:res})
        if (res.ok) {
          console.log({ res: res });
          return res.json();
        } else {
          let errorMessgae = "updation failed";
          throw new Error(errorMessgae);
        }
      })
      .then((data) => {
        alert("Updated!")
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
              ref={nameRef}
              id="name"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="profilePhoto">Image Url</label>
            <input
              type="text"
              className="form-control"
              ref={profilePhotoRef}
              id="profilePhoto"
              required
            />
          </div>

          <div className="col-md-6 my-4">
            <button type="submit" className="btn btn-info">
              {isLoading ? "Updating..." : "Submit"}
            </button>
            <button type="button" className="btn btn-danger mx-4">
              Cancle
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
