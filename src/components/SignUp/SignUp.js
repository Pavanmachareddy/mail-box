import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputConfirmPasswordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    if (enteredPassword !== inputConfirmPasswordRef.current.value) {
      alert("Confirm Password is not same as Password");
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo2sEtkLY181PMqO0HJJh5kixj1KFfvzQ",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("Successfully Registered");
        alert("Successfully Registered");
      } else {
        return res.json().then((data) => {
          console.log(data.error.message);
          alert(data.error.message);
        });
      }
    });
    inputEmailRef.current.value = "";
    inputPasswordRef.current.value = "";
    inputConfirmPasswordRef.current.value = "";
  };
  return (
    <div className="signUpBody">
      <h2>SignUp</h2>
      <form className="signUpform" onSubmit={submitHandler}>
        <input type="email" placeholder="Email" required ref={inputEmailRef} />

        <input
          type="password"
          placeholder="Password"
          required
          ref={inputPasswordRef}
        />

        <input
          type="password"
          placeholder="ConfirmPassword"
          required
          ref={inputConfirmPasswordRef}
        />

        <button className="signUpBtn">SignUp</button>

        <p>
          Already Register?<Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
