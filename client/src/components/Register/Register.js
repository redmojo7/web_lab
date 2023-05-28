import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
const { server } = require('../../config');


function RegisterForm(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");


  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${server}/api/register`, { email, password });
      console.log(`response.status: ${response.status}`);
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        console.debug(`response.data: ${response.data}`);
        props.onLogin(); // notify parent component of successful login
        //navigate(`/excercise`); 
        window.location.href = '/exercise'; 
      }
    } catch (error) {
      console.debug(`response.data.message: ${error}`);
      if (error.response && error.response.status === 409) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while registering the user');
      }
    }
  };

  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3 className='text-white'>Register Here</h3>
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {!!error && <Alert className='mt-2' variant="danger">{error}</Alert>}
        {!error && <Alert className='mt-2' variant="transparent">&nbsp;</Alert>}
        <button className="primary-button" type="submit">Register</button>
        <div style={{textAlign: "center", marginTop: "9px"}}>
          <a  href="/">Login</a>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
