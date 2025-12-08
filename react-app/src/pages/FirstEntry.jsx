import { useNavigate } from 'react-router-dom';
import './FirstEntry.css';

function FirstEntry() {
  const navigate = useNavigate();

  function goBack() {
    navigate('/add-dog');
  }

  function goHome() {
    navigate('/home');
  }

  function handleContinue() {
    navigate('/about-your-dog');
  }

  return (
    <div className="first-entry-container">
      <div className="first-entry-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>About your dog</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="first-entry-content">
        <div className="dog-illustration">
          <div className="dog-placeholder">🐕 🐕</div>
        </div>

        <div className="entry-text">
          <p>We're going to ask you to record some videos of your dog at home. This will help us understand their social habits for our dog matching.</p>
        </div>

        <button className="continue-button" onClick={handleContinue}>
          CONTINUE
        </button>
      </div>
    </div>
  );
}

export default FirstEntry;
