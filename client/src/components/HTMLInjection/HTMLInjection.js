import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Nav } from 'react-bootstrap';


function HTMLInjection() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [command, setCommand] = useState('');
  const [results, setResults] = useState('');

  const token = localStorage.getItem('token');
  console.debug(`token: ${token}`);

  const urlRegex = /(https?:\/\/[^\s]+)/g; // matches http or https URLs

  

  const handleClick = () => {
    // Clear the result area
    setResults('');

    axios.post(`http://localhost:8080/api/commands`, {
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

    axios.post(`http://localhost:8080/api/exercises`, {
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

  function extractLink() {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = results.match(urlRegex);

    if (!matches) {
      return results;
    }

    const linkUrl = matches[0];
    const linkText = results.replace(linkUrl, '');

    return (
      <div className="result">
        {linkText}{linkUrl && <a href={linkUrl} target="_blank" rel="noopener noreferrer">{linkUrl}</a>}
      </div>
    );
  }

  const handleUpClick = () => {
    handleRunClick('html_injection', 'start');
  };

  const handleDownClick = () => {
    handleRunClick('html_injection', 'stop');
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
    axios.get(`http://localhost:8080/api/users/${id}`, {
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
  }, [id]);

  return (
    <div className="container" style={{backgroundColor: "#e9ecef"}}>
      <h1 className="mb-4">Profile Page</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            picture
          </div>
          <div className="col-sm-6">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>ID:</strong> {user.id}
              </li>
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

      <div className="container mt-3">
        <h3>Results:</h3>
        <pre>{extractLink()}</pre>
      </div>
    </div>
  );
}

export default HTMLInjection;
