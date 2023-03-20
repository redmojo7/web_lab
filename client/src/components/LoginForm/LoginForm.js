import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/login', {
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
        navigate(`/userprofile/${data.id}`); // redirect to profile page
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form onSubmit={handleLogin}>
        <h3>Login Here</h3>
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log In</button>
        <a href="/register">Register</a>
      </form>
    </div>
  );
};

export default LoginForm;

