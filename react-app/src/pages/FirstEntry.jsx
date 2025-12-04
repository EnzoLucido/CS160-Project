import { useNavigate } from 'react-router-dom';
import './FirstEntry.css';

function FirstEntry() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function goHome() {
    navigate('/home');
  }

  function handleContinue() {
    navigate('/about-your-pet');
  }

  return (
    <div className="first-entry-container">
      <div className="first-entry-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>About your pet</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="first-entry-content">
        <div className="pet-illustration">
          <div className="dog-placeholder">🐕 🐕</div>
        </div>

        <div className="entry-text">
          <p>We're going to ask you to record some videos of your pet at home. This will help us understand their social habits for our pet matching.</p>
        </div>

        <button className="continue-button" onClick={handleContinue}>
          CONTINUE
        </button>
      </div>
    </div>
  );
}

export default FirstEntry;