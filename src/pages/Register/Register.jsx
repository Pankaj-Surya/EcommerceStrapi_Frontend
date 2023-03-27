import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { makeRequest } from '../../makeRequest';
import "./Register.scss"
const Register = () => {
 
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
      username: '',
      email: '',
      password: '',
    })
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(userData.username);
      axios
      .post('http://localhost:1337/api/auth/local/register', {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      })
      .then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        navigate("/login");
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });

    }
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({...userData, [name]: value });
    }
  
    return (
      <form onSubmit={handleSubmit}>
       <div className="signup">
        <div className="signup-container">
          <TextField
            fullWidth
            type="text"
            name="username"
            size="small"
            margin="dense"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => handleChange(e)}
          />

          <TextField
            fullWidth
            type="text"
            name="email"
            size="small"
            margin="dense"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => handleChange(e)}
          />
          <TextField

            fullWidth
            size="small"
            margin="dense"
            type="password"
            name="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => handleChange(e)}
          />
          <button>Signup</button>
          <Link className="link" to="/login">
            <span>Login</span>
          </Link>
        </div>
      </div>
      </form>
)}

export default Register