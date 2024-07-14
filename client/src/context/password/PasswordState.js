import React, { useState } from "react";
import PasswordContext from "./PasswordContext";
import { BiShow, BiHide } from "react-icons/bi";

const PasswordState = (props) => {
  const [visible, setVisible] = useState(true);

  const visiblity = visible ? <BiHide /> : <BiShow />;
  const inputType = visible ? "text" : "password";

  return (
    <PasswordContext.Provider value={{ visiblity, inputType, setVisible }}>
      {props.children}
    </PasswordContext.Provider>
  );
};

export default PasswordState;
