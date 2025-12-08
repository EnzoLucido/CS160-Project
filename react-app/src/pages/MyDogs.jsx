import { useNavigate } from 'react-router-dom';
import './MyDogs.css';

function MyDogs() {
  const navigate = useNavigate();

  function goBack() {
    navigate('/home');
  }

  function goToAddDog() {
    navigate('/add-dog');
  }

  function goHome() {
    navigate('/home');
  }

  return (
    <div className="my-dogs-container">
      <div className="my-dogs-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>My dogs</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="my-dogs-content">
        <div className="dog-illustration">
          <div className="dog-placeholder">🐕 🐕</div>
        </div>

        <div className="empty-state">
          <h2>No dogs added</h2>
          <p>You don't have any dogs</p>
        </div>

        <button className="add-dog-button" onClick={goToAddDog}>
          <div className="plus-icon">+</div>
        </button>
      </div>
    </div>
  );
}

export default MyDogs;
