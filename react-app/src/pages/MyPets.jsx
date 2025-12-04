import { useNavigate } from 'react-router-dom';
import './MyPets.css';

function MyPets() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function goToAddPet() {
    navigate('/add-pet');
  }

  function goHome() {
    navigate('/home');
  }

  return (
    <div className="my-pets-container">
      <div className="my-pets-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>My pets</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="my-pets-content">
        <div className="pet-illustration">
          <div className="dog-placeholder">🐕 🐕</div>
        </div>

        <div className="empty-state">
          <h2>No pets added</h2>
          <p>You don't have any pets</p>
        </div>

        <button className="add-pet-button" onClick={goToAddPet}>
          <div className="plus-icon">+</div>
        </button>
      </div>
    </div>
  );
}

export default MyPets;