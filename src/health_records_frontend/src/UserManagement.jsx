import React, { useState } from 'react';
import { HttpAgent } from '@dfinity/agent';
import { health_records_backend } from '../../declarations/health_records_backend';
import '../src/css/UserManagement.css';

const agent = new HttpAgent();

const UserManagement = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registrationUsername, setRegistrationUsername] = useState('');
  const [registrationNationalIdNo, setRegistrationNationalIdNo] = useState('');
  const [registrationTelNo, setRegistrationTelNo] = useState('');
  const [registrationYearOfBirth, setRegistrationYearOfBirth] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLogin = async () => {
    try {
      const loginResult = await health_records_backend.loginUser(loginUsername, loginPassword);

      if (loginResult.ok) {
        alert('Login successful');
        navigateToDashboard();
      } else {
        alert('Login failed: ' + loginResult.err);
      }
    } catch (err) {
      alert('Error logging in: ' + err.message);
    }
  };

  const navigateToDashboard = () => {
    window.location.href = '/Dashboard';
  };

  const openRegistrationForm = () => {
    setShowRegistration(true);
    setLoginUsername('');
    setLoginPassword('');
  };

  const handleRegistration = async () => {
    try {
      const userPayload = {
        userName: registrationUsername,
        userNationalIdNo: registrationNationalIdNo,
        userTelNo: registrationTelNo,
        yearOfBirth: parseInt(registrationYearOfBirth, 10),
        password: registrationPassword,
      };
      const result = await health_records_backend.addUser(registrationUsername, userPayload);
      alert('User added successfully');
    } catch (err) {
      alert('Error adding user: ' + err.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">User Management</h1>
      {showRegistration ? (
        <div className="registration-form">
          <h2 className="subtitle">User Registration</h2>
          <div className="form-group">
            <label htmlFor="registrationUsername">Username:</label>
            <input type="text" id="registrationUsername" value={registrationUsername} onChange={(e) => setRegistrationUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="registrationPassword">Password:</label>
            <input type="password" id="registrationPassword" value={registrationPassword} onChange={(e) => setRegistrationPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="registrationNationalIdNo">National ID No:</label>
            <input type="text" id="registrationNationalIdNo" value={registrationNationalIdNo} onChange={(e) => setRegistrationNationalIdNo(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="registrationTelNo">Telephone No:</label>
            <input type="text" id="registrationTelNo" value={registrationTelNo} onChange={(e) => setRegistrationTelNo(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="registrationYearOfBirth">Year of Birth:</label>
            <input type="text" id="registrationYearOfBirth" value={registrationYearOfBirth} onChange={(e) => setRegistrationYearOfBirth(e.target.value)} />
          </div>
          <button className="btn-primary" onClick={handleRegistration}>Register</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <div className="login-form">
          <h2 className="subtitle">User Login</h2>
          <div className="form-group">
            <label htmlFor="loginUsername">Username:</label>
            <input type="text" id="loginUsername" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password:</label>
            <input type="password" id="loginPassword" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          </div>
          <button className="btn-primary" onClick={handleLogin}>Login</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}
      {!showRegistration && (
        <p className="registration-prompt">Don't have your details? <button className="btn-secondary" onClick={openRegistrationForm}>Register</button></p>
      )}
    </div>
  );
};

export default UserManagement;
