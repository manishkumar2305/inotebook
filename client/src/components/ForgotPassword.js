import React, { useContext, useState } from "react";
import AlertContext from "../context/alerts/AlertContext";
import {BASE_URL} from "../services/helper";

const ForgotPassword = () => {
  const { showAlert } = useContext(AlertContext);
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/forgotpassword`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const json = await response.json();
    if (json.status === "201") {
      showAlert("Send a link your email", "success");
    } else {
      showAlert("Invalid Credentilas!", "danger");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <div className="forgot-password login_signup">
        <div className="col-md-12 login">
          <h3 className="mb-5">Enter your email for reset password</h3>
          <form className="my-3" onSubmit={handleResetPassword}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter Your Valid Email"
                className="form-control"
                id="email"
                name="email"
                autoComplete="off"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary login_btn mb-4"
              style={{ marginTop: "30px" }}
            >
              Send Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
