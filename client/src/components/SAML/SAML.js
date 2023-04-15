import React, { useState, useEffect } from 'react';
import axios from 'axios';
import extractLink from '../../extractLink';
const { server, serverIp} = require('../../config');


function SAML() {
  const [user, setUser] = useState({});
  const [command, setCommand] = useState('');
  const [results, setResults] = useState('');

  const token = localStorage.getItem('token');
  console.debug(`token: ${token}`);

  const urlRegex = /(https?:\/\/[^\s]+)/g; // matches http or https URLs



  const handleClick = () => {
    // Clear the result area
    setResults('');

    axios.post(`${server}/api/commands`, {
      command: command
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRunClick = (command, action) => {
    // Clear the result area
    setResults('');

    axios.post(`${server}/api/exercises`, {
      exercise: command,
      action: action
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setResults(response.data);
        //setResults(response.data.replace(urlRegex, '<a href="$&">$&</a>'));
      })
      .catch(error => {
        console.log(error);
      });
  };

  function addLinkForResult() {
    return extractLink(results, "");
  }

  const handleUpClick = () => {
    handleRunClick('saml', 'start');
  };

  const handleDownClick = () => {
    handleRunClick('saml', 'stop');
  };

  const handleInputChange = (event) => {
    setCommand(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleClick();
    }
  };

  useEffect(() => {
    axios.get(`${server}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container" style={{ backgroundColor: "#e9ecef" }}>
      <h1 className="mb-4 text-dark">SAML(Broken Authentication)</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            picture
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="commandInput">Command:</label>
              <input type="text" className="form-control" id="commandInput" value={command} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            </div>
            <button className="btn btn-primary mt-3 col-sm-3" onClick={handleClick}>Run Command</button>
          </div>
          <div className="col-sm-3">

          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
          </div>
          <div className="col-sm-6 d-flex justify-content-between">
            <button className="btn btn-primary mt-3 col-sm-5" onClick={handleUpClick}>Start SAML Instance</button>
            <button className="btn btn-danger mt-3 col-sm-5" onClick={handleDownClick}>Stop SAML Instance</button>
          </div>

          <div className="col-sm-3">
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <h3>Results:</h3>
        <pre>{addLinkForResult()}</pre>
      </div>
    </div>
  );
}

export default SAML;
