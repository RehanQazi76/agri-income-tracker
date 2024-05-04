import React, { useState } from 'react';
import { useGlobalContext } from '../Context/globalContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const {login}= useGlobalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }
    const result= login({
      email,
      password
    });
    if(result){
      navigate('/dashboard')
    }

  };

  // CSS styles as template literals
  const styles = `
    .login-form-container {
      background-color: black;
      padding: 20px;
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

  return (
    
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
          
          <br />
          <button type="submit" className="submitButton" style={{width:"350px", margin:"0 auto"}}>Submit</button>
        </form>
      </div>
  
  );
};

export default LoginForm;
