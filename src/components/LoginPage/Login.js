import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../store/authreducer";
import "./Login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmailRef = emailRef.current.value;
    const enteredPasswordRef = passwordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3RBsFQVSKs7Xbh7wE5c499hN6mGdiP4w",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmailRef,
          password: enteredPasswordRef,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.ok);
          alert("Login Sussessfully");
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data.error.message);
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        localStorage.setItem("idToken", data.idToken);
        dispatch(authActions.login(data.idToken));
        dispatch(authActions.setEmail(data.email));
        dispatch(
          authActions.setCleanEmail(data.email.replace(/[^a-zA-Z ]/g, ""))
        );
        window.location.href = "/welcome";
      })
      .catch((err) => {
        console.log("Something went wrong");
      });
  };

  return (
    <div className="loginBody">
      <form className="loginForm" onSubmit={submitHandler}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" required ref={emailRef} />
        <input
          type="password"
          placeholder="Password"
          required
          ref={passwordRef}
        />
        <Link to="/forgetpage">ForgotPassword</Link>
        <button type="submit" className="loginBtn">
          Login
        </button>
        <p>
          New user?<Link to="/">SignUp</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
