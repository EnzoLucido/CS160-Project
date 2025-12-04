
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecordingPage.css';

function RecordingPage() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  function goBack() {
    navigate(-1);
  }

  function goHome() {
    navigate('/home');
  }

  function toggleRecording() {
    if (isRecording) {
      setIsRecording(false);
      // After stopping, show completion message
      setTimeout(() => {
        alert('Recording saved successfully!');
        navigate('/walking-task');
      }, 500);
    } else {
      setIsRecording(true);
      setRecordingTime(0);
    }
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  return (
    <div className="recording-container">
      <div className="recording-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>Recording</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="recording-content">
        <div className="camera-view">
          <div className="camera-placeholder">
            📹
            {isRecording && <div className="recording-indicator">●</div>}
          </div>
        </div>

        <div className="recording-info">
          <div className="timer">
            {formatTime(recordingTime)}
          </div>
          <p className="instruction">
            {isRecording ? 'Recording in progress...' : 'Tap the button below to start recording'}
          </p>
        </div>

        <div className="recording-controls">
          <button
            className={`record-btn ${isRecording ? 'recording' : ''}`}
            onClick={toggleRecording}
          >
            <div className="record-circle"></div>
          </button>
          <p className="control-text">
            {isRecording ? 'Tap to stop' : 'Tap to record'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecordingPage;

