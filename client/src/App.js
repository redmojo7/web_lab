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
              <Nav.Link style={{ textAlign: "center" }} href="/commands">Commands</Nav.Link>
              <Nav.Link style={{ textAlign: "center" }} href="/userprofile">SQL Injection</Nav.Link>
              <Nav.Link style={{ textAlign: "center" }} href="/xss">XSS</Nav.Link>
              <Nav.Link style={{ textAlign: "center" }} href="/saml">SAML</Nav.Link>
              <Nav.Link style={{ textAlign: "center" }} href="/home">Excercise 4</Nav.Link>
              <Nav.Link style={{ textAlign: "center" }} href="/home">Excercise 5</Nav.Link>
              <Nav.Link style={{ textAlign: "center" }} href="/home">Excercise 6</Nav.Link>
              <Nav.Link style={{ textAlign: "center" }} href="/home">Excercise 7</Nav.Link>
              <Nav.Link style={{ textAlign: "center" }} href="/home">Excercise 8</Nav.Link>
              <Nav.Link style={{ textAlign: "center" }} href="/home">Excercise 9</Nav.Link>
              <Nav.Link style={{ textAlign: "center" }} href="/home">Excercise 10</Nav.Link>
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