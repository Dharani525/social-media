import React from "react";
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import SignUpOrSignIn from "./pages/signUpOrSignIn";
import Animated from "./components/animated";

function App() {
  return (
    <div className="app-container">
    <Animated /> {/* Background Animation */}
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/SignUpOrSignIn" element={<SignUpOrSignIn />} />
        </Routes>
      </div>
    </Router>
  </div>

  );
}

export default App;
