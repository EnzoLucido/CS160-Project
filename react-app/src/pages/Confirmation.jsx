import { useNavigate } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function goHome() {
    navigate('/home');
  }

  function handleViewStatus() {
    navigate('/status');
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>Find a shelter</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="confirmation-content">
        <h2 className="confirmation-title">Sent!</h2>

        <p className="confirmation-message">
          Your can now view the status in the status page.
        </p>

        <button className="view-status-button" onClick={handleViewStatus}>
          View Status
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
