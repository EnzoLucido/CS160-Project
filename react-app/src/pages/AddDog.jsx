import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddDog.css';

function AddDog() {
  const navigate = useNavigate();
  const [dogName, setDogName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [spayed, setSpayed] = useState('yes');
  const [gender, setGender] = useState('male');

  function goBack() {
    navigate('/my-dogs');
  }

  function goHome() {
    navigate('/');
  }

 function handleContinue() {
  navigate('/first-entry');
}

  return (
    <div className="add-dog-container">
      <div className="add-dog-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>Add a dog</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="add-dog-content">
        <div className="dog-illustration-small">
          <div className="dog-placeholder-small">🐕 🐕</div>
        </div>

        <form className="dog-form">
          <div className="form-group">
            <label>Dog's name</label>
            <input
              type="text"
              value={dogName}
              onChange={(e) => setDogName(e.target.value)}
              className="input-wide"
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input-short"
            />
          </div>

          <div className="form-group">
            <label>Breed</label>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="input-wide"
            />
          </div>

          <div className="form-group">
            <label className="radio-label">Spayed/Neutered:</label>
            <div className="radio-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="spayed"
                  value="yes"
                  checked={spayed === 'yes'}
                  onChange={(e) => setSpayed(e.target.value)}
                />
                Yes
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="spayed"
                  value="no"
                  checked={spayed === 'no'}
                  onChange={(e) => setSpayed(e.target.value)}
                />
                No
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="radio-label">Gender:</label>
            <div className="radio-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>
          </div>

          <button type="button" className="continue-button" onClick={handleContinue}>
            CONTINUE
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDog;
