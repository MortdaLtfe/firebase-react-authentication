import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./components/Profile.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import UpdateProfile from "./components/UpdateProfile.js";
import ForgotPassword from "./components/ForgotPassword.js";
import RequireAuth from "./context/RequireAuth.js";
const App = () => {
  return (
    <div className="container mx-auto flex justify-center items-center h-[100vh]">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              </>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="*" element="404" />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
