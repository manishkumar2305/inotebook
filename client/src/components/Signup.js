import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../login-bg.svg";
import AlertContext from "../context/alerts/AlertContext";
import { useFormik } from "formik";
import { SignupSchema } from "../schema";
import { BiShow, BiHide } from "react-icons/bi";
import { BASE_URL } from "../services/helper";

const Signup = () => {
  const { showAlert } = useContext(AlertContext);
  let navigate = useNavigate();
  let credentilas = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
  };

  let { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: credentilas,
      validationSchema: SignupSchema,
    });

  const capitalize = (errors) => {
    const lower = errors.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
        cpassword: values.cpassword,
      }),
    });

    const json = await response.json();
    const error = json.errors;
    if (json.success) {
      // Save the auth token and redirect
      // localStorage.setItem("token", json.authtoken);
      showAlert("Your account is created successfully! ", "success");
      navigate("/login");
      credentilas = {
        name: "",
        email: "",
        password: "",
        cpassword: "",
      };
    } else if (json.success === false) {
      showAlert(error[0].msg, "danger");
    } else {
      showAlert("Internal Server Error", "danger");
    }
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
        <div className="login_signup signup_form">
          <div className="col-md-6 signup_bg d-flex justify-content-center align-items-center">
            <img src={loginBg} alt="login-bg" />
          </div>
          <div className="col-md-6 signup">
            <h3 className="mb-4">Create an account for using iNotebook</h3>
            <form className="my-3" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Full Name"
                  required="true"
                  className="form-control"
                  id="name"
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.name && touched.name ? (
                  <p
                    className="error-msg"
                    style={{
                      color: "red",
                      marginLeft: "2px",
                      fontSize: "15px",
                    }}
                  >
                    {capitalize(errors.name)}
                  </p>
                ) : null}
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  className="form-control"
                  required="true"
                  id="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.email && touched.email ? (
                  <p
                    className="error-msg"
                    style={{
                      color: "red",
                      marginLeft: "2px",
                      fontSize: "15px",
                    }}
                  >
                    {capitalize(errors.email)}
                  </p>
                ) : null}
              </div>
              <div className="mb-3">
                <input
                  type={inputType}
                  autoComplete="off"
                  placeholder="Password"
                  required="true"
                  className="form-control password"
                  id="password"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className="password-show-hide">
                  {visible ? (
                    <BiHide onClick={handleVisible} />
                  ) : (
                    <BiShow onClick={handleVisible} />
                  )}
                </p>
                {errors.password && touched.password ? (
                  <p
                    className="error-msg"
                    style={{
                      color: "red",
                      marginLeft: "2px",
                      fontSize: "15px",
                    }}
                  >
                    {capitalize(errors.password)}
                  </p>
                ) : null}
              </div>
              <div className="mb-3">
                <input
                  type={inputType}
                  autoComplete="off"
                  placeholder="Confirm Password"
                  required="true"
                  className="form-control password"
                  id="cpassword"
                  name="cpassword"
                  value={values.cpassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className="password-show-hide">
                  {visible ? (
                    <BiHide onClick={handleVisible} />
                  ) : (
                    <BiShow onClick={handleVisible} />
                  )}
                </p>
                {errors.cpassword && touched.cpassword ? (
                  <p
                    className="error-msg"
                    style={{
                      color: "red",
                      marginLeft: "2px",
                      fontSize: "15px",
                    }}
                  >
                    {capitalize(errors.cpassword)}
                  </p>
                ) : null}
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  required
                />
                <label
                  className="form-check-label"
                  htmlFor="exampleCheck1"
                  required="true"
                >
                  I agree to all the terms of <Link to="/">Conditions</Link> &{" "}
                  <Link to="/">Privacy Policy</Link>{" "}
                </label>
              </div>
              <button type="submit" className="btn btn-primary signup_btn">
                Sign Up
              </button>
            </form>
            <p>
              Already have an account? <Link to="/login">Login</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
