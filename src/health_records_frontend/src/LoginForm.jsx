import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './app.scss'; // Import the provided CSS file
import liveGif from './assets/cartoon-560_256.gif'; // Import the live GIF

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform authentication logic (e.g., API call)
    // For simplicity, we'll assume the login is successful
    if (username === 'admin' && password === 'password') {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {error && <div className="error">{error}</div>}
        </form>
        <div className="additional-links">
          <Link to="/">Back to Landing Page</Link>
        </div>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Your Brand. All rights reserved.</p>
        </footer>
      </div>
      <div className="live-gif-container">
        <img src={liveGif} alt="Live GIF" className="live-gif" />
      </div>
    </div>
  );
}

export default LoginForm;
