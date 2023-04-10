import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
const { server } = require('../../config');


function RegisterForm(props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${server}/api/register`, formData);
      localStorage.setItem('token', response.data.token);
      console.debug(`response.data: ${response.data}`);
      props.onLogin(); // notify parent component of successful login
      navigate(`/userprofile`); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Register Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.firstName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.lastName} onChange={handleChange} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
