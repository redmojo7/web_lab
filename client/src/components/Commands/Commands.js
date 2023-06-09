import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { extractLink, extractUrlFromResult } from '../../extractLink';
const { server, serverIp } = require('../../config');

function CommandsPage() {
  const [user, setUser] = useState({});
  const [command, setCommand] = useState('');
  const [results, setResults] = useState('');
  const [error, setError] = useState(null); // initialize error state


  const token = localStorage.getItem('token');
  console.debug(`token: ${token}`);

  const urlRegex = /(https?:\/\/[^\s]+)/g; // matches http or https URLs



  const handleClick = () => {
    // Clear the result area
    setResults('');
    setError(null); // clear any previous errors

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
        if (error.response && error.response.status === 400) {
          setError(error.response.data); // set error state
        }
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

  function addIFrameForResult() {
    return extractUrlFromResult(results, "");
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
      <h1 className="mb-4 text-dark">SQL Injection</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            
          </div>
          <div className="col-sm-6">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Name:</strong> {user.first_name} {user.last_name}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {user.email}
              </li>
              {/* additional profile information */}
            </ul>
            <br />
            <div className="form-group">
              <label htmlFor="commandInput">Command:</label>
              <input type="text" className="form-control" id="commandInput" value={command} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            </div>
            {error && <Alert variant="danger">{error}</Alert>} {/* render Alert if error state is set */}
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
            <button className="btn btn-primary mt-3 col-sm-5" onClick={handleUpClick}>Start SQL Injection Instance</button>
            <button className="btn btn-danger mt-3 col-sm-5" onClick={handleDownClick}>Stop SQL Injection Instance</button>
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

export default CommandsPage;