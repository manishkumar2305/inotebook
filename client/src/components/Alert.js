import React, { useContext } from "react";
import AlertContext from "../context/alerts/AlertContext";

const Alert = () => {
  const { alert } = useContext(AlertContext);
  const capitalize = (word) => {
    if (word === "danger") {
      word = "Error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show ${alert.type}`}
          role="alert"
        >
          <strong>{capitalize(alert.type)}</strong>: {alert.msg}
        </div>
      )}
    </>
  );
};

export default Alert;
