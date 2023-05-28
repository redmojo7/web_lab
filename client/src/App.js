import React, { useState, useEffect } from "react";


import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginForm from "./components/LoginForm/LoginForm"
import Commands from "./components/Commands/Commands"
import RegisterForm from "./components/Register/Register";
import { Row, Col } from 'react-bootstrap';
import auth from "./components/Auth/Auth";
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';
import GenericComponent from "./components/GenericComponent";
const { server, serverIp } = require('./config');


function App() {

  const [src, setSrc] = useState(`http://${serverIp}:8100/`);

  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    // handle login logic
    setIsLoggedIn(false);
  };

  const handleClick = async (excercise) => {
    console.log(`excercise: ${excercise}`);
    setSrc(excercise);
  }

  console.log(`login: ${isLoggedIn}`);

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
    console.log(`login checking: ${isLoggedIn}`);
  }, []);

  return (
    <div className="App">
      <Header hidden={!isLoggedIn} />
      <Router>
        <Row>
          <Navigation hidden={!isLoggedIn} onClick={handleClick} />
          <Col md={10} >
              <Routes>
                <Route path="/" element={<LoginForm onLogin={handleLogin}  />} />
                <Route path="/exercise" element={<GenericComponent src={`${src}/`} hidden={!isLoggedIn} isLoggedIn={isLoggedIn}/>} />
                 {/*<Route path="/commands" element={<Commands />} /> */}
                <Route path="/register" element={<RegisterForm onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          </Col>
        </Row>
      </Router>
      <Footer hidden={!isLoggedIn} />
    </div>
  );
}

export default App