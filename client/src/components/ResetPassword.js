import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alerts/AlertContext";
import { useFormik } from "formik";
import { SignupSchema } from "../schema";
import { BiShow, BiHide } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../services/helper";

const ResetPassword = () => {
  const { showAlert } = useContext(AlertContext);
  let navigate = useNavigate();
  const { id, token } = useParams();
  const credentilas = {
    password: "",
    cpassword: "",
  };

  let {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: credentilas,
    validationSchema: SignupSchema,
  });

  //   Valid user
  const validUser = async () => {
    const response = await fetch(`${BASE_URL}/resetpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const json = await response.json();
    if (!json.status === "200") {
      navigate("*");
    }
  };

  //   Reset New Password
  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/${id}/${token}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        password: values.password,
        cpassword: values.cpassword,
      }),
    });

    const json = await response.json();
    const error = json.errors;
    if (json.success) {
      showAlert("Reset your password successfully", "success");
    } else if (json.success === false) {
      showAlert(error[0].msg, "danger");
    } else {
      showAlert("Token is expired please send new valid link", "danger");
    }
  };

  const capitalize = (errors) => {
    const lower = errors.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
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

  useEffect(() => {
    validUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <div className="forgot-password login_signup">
        <div className="col-md-12 login">
          <h3 className="mb-5">Reset Your Password</h3>
          <form className="my-3" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type={inputType}
                autoComplete="off"
                placeholder="New Password"
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
                placeholder="Confirm New Password"
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
            <button
              type="submit"
              className="btn btn-primary login_btn mb-4"
              style={{ marginTop: "30px" }}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
