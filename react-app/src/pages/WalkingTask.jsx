import { useNavigate } from 'react-router-dom';
import './WalkingTask.css';

function WalkingTask() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function goHome() {
    navigate('/home');
  }

  function handleRecord() {
    alert('Recording started...');
  }

  function handleUpload() {
    alert('Upload functionality...');
  }

  return (
    <div className="walking-task-container">
      <div className="task-header">
        <span className="task-title">Walking</span>
      </div>

      <div className="walking-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>About your pet</h1>
        <button className="home-button" onClick={goHome}>
          🏠
        </button>
      </div>

      <div className="walking-content">
        <div className="dog-illustration">
          <div className="dogs-image">🐕 🐶</div>
        </div>

        <div className="instruction-section">
          <h2>Record your dog walking</h2>
          <p>Walk your dog like you typically would for about 2 minutes. This includes regular leashes and routes.</p>
        </div>

        <div className="button-section">
          <button className="record-button" onClick={handleRecord}>
            RECORD
          </button>
          <button className="upload-button" onClick={handleUpload}>
            UPLOAD
          </button>
        </div>
      </div>
    </div>
  );
}

export default WalkingTask;