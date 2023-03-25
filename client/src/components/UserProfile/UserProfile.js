import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [command, setCommand] = useState('');
  const [results, setResults] = useState('');

  const token = localStorage.getItem('token');
  console.debug(`token: ${token}`);

  const handleClick = () => {
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
    <div className="container">
      <h1 className="mb-4">Profile Page</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
          </div>
          <div className="col-sm-6">
          </div>
          <div className="col-sm-3">
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
            <pre>{results}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
