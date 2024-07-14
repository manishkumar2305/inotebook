import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <h1>404 Page Not Found</h1>
        <Link to={"/"} class="btn btn-primary mt-5">
          Go To Home Page
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
