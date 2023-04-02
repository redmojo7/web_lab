import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from "./components/LoginForm/LoginForm"
import UserProfile from "./components/UserProfile/UserProfile";
import HTMLInjection from "./components/HTMLInjection/HTMLInjection"
import RegisterForm from "./components/Register/Register";
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import auth from "./components/Auth/Auth";
import { useNavigate } from "react-router-dom";
import Footer from './Footer';

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
  //const message = "hello.....

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
    auth.logout();
  };

  useEffect(() => {
    auth.checkLogin()
  }, []);


  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Web Lab</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#logout" onClick={handleLogout} >Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Router>
        <Row>
          <Col md={2} style={{ overflowY: 'scroll', height: 'calc(100vh - 56px)' }}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <h5 style={{color: "lightskyblue", textAlign: "center"}}>Excercises</h5>
              <Nav.Link style={{textAlign: "center"}} href="/userprofile">SQL Injection</Nav.Link>
              <Nav.Link style={{textAlign: "center"}} href="/HTMLInjection">HTML Injection</Nav.Link>
              <Nav.Link style={{textAlign: "center"}} href="/home">Excercise 3</Nav.Link>
              <Nav.Link style={{textAlign: "center"}} href="/home">Excercise 4</Nav.Link>
              <Nav.Link style={{textAlign: "center"}} href="/home">Excercise 5</Nav.Link>
              <Nav.Link style={{textAlign: "center"}} href="/home">Excercise 6</Nav.Link>
              <Nav.Link style={{textAlign: "center"}} href="/home">Excercise 7</Nav.Link>
              <Nav.Link style={{textAlign: "center"}} href="/home">Excercise 8</Nav.Link>
              <Nav.Link style={{textAlign: "center"}} href="/home">Excercise 9</Nav.Link>
              <Nav.Link style={{textAlign: "center"}} href="/home">Excercise 10</Nav.Link>
            </Nav>
          </Col>
          <Col md={10}>
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/userprofile/" element={<UserProfile />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/HTMLInjection" element={<HTMLInjection />} />
            </Routes>
          </Col>
        </Row>
      </Router>
      <Footer />
    </div>
  );
}

export default App