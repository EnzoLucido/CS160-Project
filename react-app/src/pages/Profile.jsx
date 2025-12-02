import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    // Load from localStorage or use default values
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      address: '123 Main Street, Berkeley, CA 94704'
    };
  });
  const [originalData, setOriginalData] = useState(profileData);

  function goBack() {
    navigate(-1);
  }

  function goHome() {
    navigate('/home');
  }

  function handleEdit() {
    setOriginalData(profileData); // Save current data in case of cancel
    setIsEditing(true);
  }

  function handleSave() {
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setOriginalData(profileData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  }

  function handleCancel() {
    // Restore original data
    setProfileData(originalData);
    setIsEditing(false);
  }

  function handleChange(field, value) {
    setProfileData({
      ...profileData,
      [field]: value
    });
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>Profile</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {profileData.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h2 className="profile-name">{profileData.name}</h2>
        </div>

        <div className="profile-info-section">
          <h3 className="section-title">Personal Information</h3>

          <div className="info-field">
            <label className="field-label">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                className="field-input"
                value={profileData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            ) : (
              <p className="field-value">{profileData.name}</p>
            )}
          </div>

          <div className="info-field">
            <label className="field-label">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                className="field-input"
                value={profileData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            ) : (
              <p className="field-value">{profileData.email}</p>
            )}
          </div>

          <div className="info-field">
            <label className="field-label">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                className="field-input"
                value={profileData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            ) : (
              <p className="field-value">{profileData.phone}</p>
            )}
          </div>

          <div className="info-field">
            <label className="field-label">Address</label>
            {isEditing ? (
              <input
                type="text"
                className="field-input"
                value={profileData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            ) : (
              <p className="field-value">{profileData.address}</p>
            )}
          </div>
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="save-button" onClick={handleSave}>
                Save Changes
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-button" onClick={handleEdit}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

