import { useNavigate } from 'react-router-dom';
import './Status.css';

function Status() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function goHome() {
    navigate('/');
  }

  function handleViewStatus(shelterName) {
    navigate('/status-detail', { state: { shelterName } });
  }

  return (
    <div className="status-container">
      <div className="status-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>Status</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="status-content">
        <div className="shelter-item">
          <h2 className="shelter-name">Berkeley Humane</h2>
          <button className="view-status-button" onClick={() => handleViewStatus('Berkeley Humane')}>
            View Status
          </button>
        </div>

        <div className="shelter-item">
          <h2 className="shelter-name">Rocket Dog Rescue</h2>
          <button className="view-status-button" onClick={() => handleViewStatus('Rocket Dog Rescue')}>
            View Status
          </button>
        </div>
      </div>
    </div>
  );
}

export default Status;

