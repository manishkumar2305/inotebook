import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AlertState from "./context/alerts/AlertState";
import Alert from "./components/Alert";
import ForgotPassword from "./components/ForgotPassword";
import PasswordState from "./context/password/PasswordState";
import ResetPassword from "./components/ResetPassword";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <NoteState>
      <AlertState>
        <PasswordState>
          <Router>
            <Navbar />
            <Alert />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route
                path="/resetpassword/:id/:token"
                element={<ResetPassword />}
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Router>
        </PasswordState>
      </AlertState>
    </NoteState>
  );
}

export default App;
