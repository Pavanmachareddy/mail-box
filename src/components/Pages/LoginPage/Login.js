import React, { useRef } from "react";
import { useNavigate ,Link} from "react-router-dom";
import "./Login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmailRef = emailRef.current.value;
    const enteredPasswordRef = passwordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo2sEtkLY181PMqO0HJJh5kixj1KFfvzQ",
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
        navigate("/welcome");
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