import { Routes, Route } from "react-router-dom";
import "./App.css";
import ForgetPage from "./components/Pages/ForgetPage";
import Login from "./components/LoginPage/Login";
import SignUp from "./components/SignUp/SignUp";
import Wellcome from "./components/Pages/Wellcome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authreducer";

function App() {
  const [id, setId] = useState(false);
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  console.log(isLogin, "-------lllllllllll");

  useEffect(() => {
    dispatch(authActions.login());
    setId(localStorage.getItem("idToken"));
  }, [id]);
 
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        {/* <Route exact path="/login" element={<Login />} /> */}
        {isLogin && id && (
          <Route exact path="/welcome" element={<Wellcome />} />
        )}
        <Route exact path="/forgetpage" element={<ForgetPage />} />
        <Route exact path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
