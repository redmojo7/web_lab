import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import './LoginForm.css';
import Auth from "../Auth/Auth"

const { server } = require('../../config');


const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState("");


  if (Auth.isAuthenticated()) {
    navigate(`/`); // redirect to profile page
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${server}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data); // use data to update UI or state
      if (response.ok) {
        localStorage.setItem('token', data.token);
        props.onLogin(); // notify parent component of successful login
        //navigate(`/exercise`); // redirect to profile page
        window.location.href = '/exercise';
      } else {
        setError(data.message);
        console.log(`error ${data.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleLogin}>
        <h3 className='text-white'>Login Here</h3>
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {!!error && <Alert className='mt-2' variant="danger">{error}</Alert>}
        {!error && <Alert className='mt-2' variant="transparent">&nbsp;</Alert>}
        <button className="primary-button" type="submit">Log In</button>
        <div style={{textAlign: "center", marginTop: "9px"}}>
          <a  href="/register">Register</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

