import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from "./components/LoginForm/LoginForm"
import UserProfile from "./components/UserProfile/UserProfile";
import RegisterForm from "./components/Register/Register";

function App() {
  
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/express_backend")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      });
  }, []);
  //const message = "hello....."
  return (
    <div className="App">
      <h1>{message}</h1>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route path="/userprofile/:id" element={<UserProfile />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App