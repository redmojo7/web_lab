import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  //const id = 11;//
  const { id } = useParams();
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');
  console.debug(`token: ${token}`);

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
    <div>
      <h1>Profile Page</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.first_name} {user.last_name}</p>
      <p>Email: {user.email}</p>
      {/* additional profile information */}
    </div>
  );
}

export default ProfilePage;
