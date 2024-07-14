import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginBg from "../login-bg.svg";
import AlertContext from "../context/alerts/AlertContext";
import { BiShow, BiHide } from "react-icons/bi";
import {BASE_URL} from "../services/helper";

const Login = () => {
  const { showAlert } = useContext(AlertContext);
  const [credentilas, setCredentilas] = useState({ email: "", password: "" });
  let [check, setCheck] = useState(false);
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentilas.email,
        password: credentilas.password,
      }),
    });

    const json = await response.json();
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("check", check);
      setCheck(check);
      navigate("/");
      showAlert("Loggedin successfully! ", "success");
    } else {
      showAlert("Invalid Credentilas!", "danger");
    }
  };

  useEffect(() => {
    const handleTabClose = (e) => {
      e.preventDefault();
      const checked = JSON.parse(localStorage.getItem("check"));
      if (checked) {
        localStorage.getItem("token");
        navigate("/");
        showAlert("Loggedin successfully! ", "success");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("check");
        navigate("/signup");
      }
    };
    window.addEventListener("beforeunload", handleTabClose, { capture: true });
    return () => {
      window.removeEventListener("beforeunload", handleTabClose, {
        capture: false,
      });
    };
  },);

  const onChange = (e) => {
    setCredentilas({ ...credentilas, [e.target.name]: e.target.value });
  };

  const onChangeCheck = (e) => {
    setCheck(e.target.checked);
  };

  // Password show hide
  const [visible, setVisible] = useState(true);
  const inputType = visible ? "password" : "text";

  const handleVisible = () => {
    if (visible === true) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <div className="login_form login_signup">
          <div className="col-md-6 login">
            <h3 className="mb-4">
              Welcome in iNotebook! <br /> Login to continue to iNotebook
            </h3>
            <form className="my-3" onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={credentilas.email}
                  onChange={onChange}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <input
                  type={inputType}
                  placeholder="Password"
                  className="form-control password"
                  id="password"
                  name="password"
                  value={credentilas.password}
                  onChange={onChange}
                  autoComplete="off"
                />
                <p className="password-show-hide">
                  {visible ? (
                    <BiHide onClick={handleVisible} />
                  ) : (
                    <BiShow onClick={handleVisible} />
                  )}
                </p>
              </div>
              <div className="mb-4 form-check d-flex justify-content-between">
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    onChange={onChangeCheck}
                    checked={check}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Keep me logged in
                  </label>
                </div>
                <p>
                  <Link to="/forgotpassword">Forgot Password?</Link>
                </p>
              </div>
              <button type="submit" className="btn btn-primary login_btn">
                Login
              </button>
            </form>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>{" "}
            </p>
          </div>
          <div className="col-md-6 login_bg d-flex justify-content-center align-items-center">
            <img src={loginBg} alt="login-bg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
