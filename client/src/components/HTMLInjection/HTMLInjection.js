import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Nav } from 'react-bootstrap';
import { extractLink, extractUrlFromResult } from '../../extractLink';
const { server, serverIp } = require('../../config');


function HTMLInjection() {
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
    return extractLink(results, "chat.php");
  }

  function addIFrameForResult() {
    return extractUrlFromResult(results, "chat.php");
  }

  const handleUpClick = () => {
    handleRunClick('sql_injection', 'start');
  };

  const handleDownClick = () => {
    handleRunClick('sql_injection', 'stop');
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
      <h1 className="mb-4 text-dark">HTML Injection</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            
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
            <button className="btn btn-primary mt-3 col-sm-5" onClick={handleUpClick}>Start HTML Injection Instance</button>
            <button className="btn btn-danger mt-3 col-sm-5" onClick={handleDownClick}>Stop HTML Injection Instance</button>
          </div>

          <div className="col-sm-3">
          </div>
        </div>
      </div>
      <br />
      {results && (
        <div className="container mt-3">
          <h3>Results:</h3>
          <pre>{addLinkForResult()}</pre>
          <br />
        </div>
      )}
      {results && results.includes('http') ? (
        <div className="container">
          <h3>Iframe:</h3>
          <div className="flex-grow-1">
            <iframe className="w-100" style={{ height: "500px" }} src={addIFrameForResult()}></iframe>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default HTMLInjection;
