// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserProvider.jsx"; // Import the UserProvider
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Login Page */}
          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path="/home" element={<Home />} /> {/* Home Page */}
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);
