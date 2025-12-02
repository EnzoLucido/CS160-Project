import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e) {
    e.preventDefault();

    // Store login status
    localStorage.setItem('isLoggedIn', 'true');
    // Navigate to home page
    navigate('/home');
  }

  function goToSignUp() {
    navigate('/signup');
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Pet Shelter App</h1>
          <p className="login-subtitle">Welcome back! Please login to continue.</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <button onClick={goToSignUp} className="signup-link">Sign up</button></p>
        </div>
      </div>
    </div>
  );
}

export default Login;

