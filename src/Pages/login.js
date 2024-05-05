import React, { useState } from 'react';
import { useGlobalContext } from '../Context/globalContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const LoginForm = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleFormSubmit =async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/v1/login", {
        email,
        password,
      });

      // Ensure the response contains a token
      console.log(response.data)
      if (response.data ) {
        const  token  = response.data;
        console.log(token)
        // Store the token in local storage or context
        localStorage.setItem("authToken", token);
        console.log(localStorage)
        navigate("/dashboard");

        // Display a success notification
        toast.success('Successfully signed in!')
      } else {
        throw new Error("Token not found in response.");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error during sign-in");
   
    }
  };

  // CSS styles as template literals
  const styles = `
    .login-form-container {
      background-color: black;
      padding: 20px;
    }
    h1{
      text-align: center;
      font-size: 50px;
    }
    .login-form {
      background-color: #CADCFC;
      padding: 20px;
      border-radius: 10px;
      width: 400px;
      margin :20px auto 0 auto;
    }

    .input-container {
      margin-bottom: 10px;
    }

    .input-box {
      width: 100%;
      padding: 8px;
      border-radius: 5px;
      border: none;
      background-color: #ffffff;
      color : black;
    }

    .error-label {
      color: red;
    }

    .input-button {
      width: 100%;
      padding: 10px;
      color:#CADCFC
      border-radius: 5px;
      border: none;
      background-color: #00246B;
      cursor: pointer;
    }

    .input-button:hover {
      background-color: #cccccc;
    }
  `;

  return (<>
    <h1 style={{padding:"20px"}}>Welcome to AgriTracker!!</h1>
      <div className="login-form">
          <style>{styles}</style> {/* Include CSS styles */}
          
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-box"
            />
            <label className="error-label">{emailError}</label>
          </div>
          <br />
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-box"
            />
            <label className="error-label">{passwordError}</label>
          </div>
          
          <button type="submit" className="submitButton" style={{width:"350px", margin:"0 auto"}}>Submit</button>
        </form>
        <br />
          <br />
          <span style={{textDecoration :"none", margin:"18px", fontSize:"large"}}>Don't have an account?</span>
        <Link  to="/signup" style={{textDecoration :"none", margin:"18px", fontSize:"large"}}>sign up</Link>
          
      </div>
      </>
  
  );
};

export default LoginForm;
