import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  function handleChange(field, value) {
    setFormData({
      ...formData,
      [field]: value
    });
  }

  function handleSignUp(e) {
    e.preventDefault();

    // Save user profile
    const userProfile = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    };
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    // Set login status
    localStorage.setItem('isLoggedIn', 'true');

    // Navigate to home page
    navigate('/home');
  }

  function goToLogin() {
    navigate('/login');
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Pet Shelter App</h1>
          <p className="signup-subtitle">Create your account to get started</p>
        </div>

        <form className="signup-form" onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className="form-input"
              placeholder="Enter your address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <button onClick={goToLogin} className="login-link">Login</button></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

