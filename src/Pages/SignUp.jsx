import React, { useState } from 'react';
import axios from "axios";
import{toast } from 'react-hot-toast'
import { useGlobalContext } from '../Context/globalContext';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  // const {registerUser} = useGlobalContext();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUsername] = useState(''); // Added state for username
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();
  const handleFormSubmit = async (e) =>  {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword || !userName) { // Added check for username
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }
   

    try {
      const{data}= await axios.post("http://localhost:4000/api/v1/register", {
        userName,
        email,
        password,
        
      });
      if(data.error){
          toast.error(data.error);
          return false;
      }
      else{
          toast.success("user registered")
          navigate('/dashboard')
          return true;
          
      }
  } catch (error) {
      
  }
    console.log('Signing up with:', email, userName, password); // Included username
    
  };

  const styles = `
  h1{
    text-align: center;
    font-size: 50px;
  }
    .signup-page {
      
      min-height: 100vh;
  
      justify-content: center;
      align-items: center;
    }

    .signup-form {
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
      color : #CADCFC;
    }

    .error-label {
      color: red;
    }

    .input-button {
      width: 100%;
      padding: 10px;
      
      border-radius: 5px;
      border: none;
      background-color: #00246B;
      
      cursor: pointer;
    }

    .input-button:hover {
      background-color: #cccccc;
    }
    .link{
      color :#00246B;
      &:hover{
        color :black;
      }
      margin-bottom :30px;
      font-size:20px
    }
  `;

  return (
    <div className="signup-page">
      <h1 style={{padding:"20px"}}>Welcome to AgriTracker</h1>
      <div className="signup-form">
        <h2>Sign Up</h2>
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
            <label htmlFor="username">Username:</label> {/* Added username field */}
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              className="input-box"
            />
            {/* You can add validation for the username here */}
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
          <div className="input-container">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-box"
            />
            <label className="error-label">{confirmPasswordError}</label>
          </div>
          <br />
          <Link className='link' to="/login" style={{textDecoration :"none"}}> Already have an account</Link>
          <br/>
          <br/>
          <button type="submit" className="submitButton" style={{width:"350px", margin:"0 auto"}}>Submit</button>
        </form>
      </div>
      <style>{styles}</style> {/* Include CSS styles */}
    </div>
  );
};

export default SignupPage;
