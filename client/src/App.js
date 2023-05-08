import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from "./components/LoginForm/LoginForm"
import UserProfile from "./components/UserProfile/UserProfile";
import Commands from "./components/Commands/Commands"
import XSS from "./components/XSS/XSS"
import RegisterForm from "./components/Register/Register";
import SAML from "./components/SAML/SAML";
import BOLA from "./components/BOLA/BOLA"
import MA from "./components/MA/MA"
import SM from "./components/SM/SM"
import EDE from "./components/EDE/EDE"
import LORRL from "./components/LORRL/LORRL";
import { Row, Col } from 'react-bootstrap';
import auth from "./components/Auth/Auth";
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';
const { server } = require('./config');


function App() {

  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    // handle login logic
    setIsLoggedIn(true);
  };

  console.log(`server: ${server}`);

  useEffect(() => {
    fetch(`${server}/express_backend`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      });
  }, []);
  //const message = "hello.....

  useEffect(() => {
    auth.checkLogin();
    setIsLoggedIn(auth.isAuthenticated()); // set isLoggedIn to true if token exists, false otherwise
  }, []);

  return (
    <div className="App">
        <Header hidden={!isLoggedIn} />
      <Router>
        <Row>
          <Navigation hidden={!isLoggedIn}/>
          <Col md={10}>
            <Routes>
              <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
              <Route path="/commands" element={<Commands />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/register" element={<RegisterForm onLogin={handleLogin} />} />
              <Route path="/xss" element={<XSS />} />
              <Route path="/saml" element={<SAML />} />
              <Route path="/bola" element={<BOLA />} />
              <Route path="/ede" element={<EDE />} />
              <Route path="/lorrl" element={<LORRL />} />
              <Route path="/ma" element={<MA />} />
              <Route path="/sm" element={<SM />} />
            </Routes>
          </Col>
        </Row>
      </Router>
      <Footer hidden={!isLoggedIn} />
    </div>
  );
}

export default App