import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { makeRequest } from '../../makeRequest';
import { loginCall } from '../../redux/apiCalls';
import { loginSuccess } from '../../redux/authReducer';
import "./Login.scss"
const Login = () => {
 
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
      identifier: '',
      password: '',
    })
 
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(userData.identifier);
      
      axios
      .post('http://localhost:1337/api/auth/local', {
        identifier: userData.identifier,
        password: userData.password,
      })
      .then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        loginCall(dispatch,userData)
        //dispatch(loginSuccess(response.data.user));    
        navigate("/")
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
       <div className="login">
        <div className="login-container">
          <TextField
            fullWidth
            type="text"
            name="identifier"
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
          <button>Login</button>
          <Link className="link" to="/register">
            <span>Register</span>
          </Link>
        </div>
      </div>
      </form>
)}

export default Login