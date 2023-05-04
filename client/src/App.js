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
import EDE from "./components/EDE/EDE"
import LORRL from "./components/LORRL/LORRL";
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import auth from "./components/Auth/Auth";
import Footer from './Footer';
import Header from './Header';
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
      <div hidden={!isLoggedIn}>
        <Header />
      </div>
      <Router>
        <Row>
          <Col hidden={!isLoggedIn} md={2} style={{ overflowY: 'scroll', height: 'calc(100vh - 56px)' }}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <h5 style={{ color: "lightskyblue", textAlign: "center" }}>Excercises</h5>
              <Nav.Link style={{ textAlign: "left" }} href="/commands">Commands</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/userprofile">SQL Injection</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/xss">Cross-Site Scripting</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/saml">Broken User Authentication</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/bola">Broken Object Level Authorization</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/ede">Excessive Data Exposure</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/lorrl">Lack of Resources & Rate Limiting</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/ma">Mass Assignment</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/home">Excercise 8</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/home">Excercise 9</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/home">Excercise 10</Nav.Link>
            </Nav>
          </Col>
          <Col md={10}>
            <Routes>
              <Route path="/" element={<LoginForm onLogin={handleLogin}/>} />
              <Route path="/commands" element={<Commands />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/register" element={<RegisterForm onLogin={handleLogin}/>} />
              <Route path="/xss" element={<XSS />} />
              <Route path="/saml" element={<SAML />} />
              <Route path="/bola" element={<BOLA />} />
              <Route path="/ede" element={<EDE />} />
              <Route path="/lorrl" element={<LORRL />} />
              <Route path="/ma" element={<MA />} />
            </Routes>
          </Col>
        </Row>
      </Router>
      <div hidden={!isLoggedIn}>
        <Footer />
      </div>
    </div>
  );
}

export default App