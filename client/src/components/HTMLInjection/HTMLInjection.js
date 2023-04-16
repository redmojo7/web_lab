import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { extractLink, extractUrlFromResult } from '../../extractLink';
const { server } = require('../../config');


function HTMLInjection() {
  const [results, setResults] = useState('');

  const token = localStorage.getItem('token');

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

  useEffect(() => {
    handleRunClick('sql_injection', 'start');
  }, []);

  return (
    <div className="container" style={{ backgroundColor: "#e9ecef" }}>
      <h1 className="mb-4 text-dark">HTML Injection</h1>
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
        <div className="container">
          <div className="row">
            <div className="col-1">
              <strong>Results:</strong>
            </div>
            <div className="col">
              <pre>{addLinkForResult()}</pre>
            </div>
          </div>
          <br />
        </div>
      )}
      {results && results.includes('http') ? (
        <div className="container">
          <div className="flex-grow-1">
            <iframe className="w-100" style={{ height: "500px" }} src={addIFrameForResult()}></iframe>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default HTMLInjection;
