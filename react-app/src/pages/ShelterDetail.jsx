import { useNavigate } from 'react-router-dom';
import './ShelterDetail.css';

function ShelterDetail() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function goHome() {
    navigate('/home');
  }

  function handleSend() {
    navigate('/confirmation');
  }

  return (
    <div className="shelter-detail-container">
      <div className="shelter-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>Find a shelter</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="shelter-content">
        <h2 className="shelter-name">Berkeley Humane</h2>

        <div className="shelter-info">
          <p><strong>Address:</strong> 936 Carleton St, Berkeley, CA 94710</p>
          <p><strong>Phone:</strong> (510) 845-7735</p>
          <p><strong>Website:</strong> <a href="https://berkeleyhumane.org">https://berkeleyhumane.org</a></p>
        </div>

        <div className="send-section">
          <p className="send-prompt">Do you want to send information of your pets to this shelter?</p>
          <button className="send-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShelterDetail;
