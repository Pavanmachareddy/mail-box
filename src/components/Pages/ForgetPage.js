import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPage = () => {
  const emailRef = useRef();
  const navigate = useNavigate();

  const resetpasswordHandler = (e) => {
    e.preventDefault();

    const enterResetEmail = emailRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB3RBsFQVSKs7Xbh7wE5c499hN6mGdiP4w",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enterResetEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("Reset Link Sent");
          return res.json();
        } else {
          return res.json((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div>
      <h2>Enter EmailId which you Registered</h2>
      <form onSubmit={resetpasswordHandler}>
        <input type="email" placeholder="Email" required ref={emailRef} />
        <button type="submit">Send Link</button>
      </form>
    </div>
  );
};

export default ForgetPage;
