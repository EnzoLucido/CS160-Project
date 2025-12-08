import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CuesTask.css';

function CuesTask() {
  const navigate = useNavigate();

  const [uploadedVideo, setUploadedVideo] = useState(() => {
    const videoInfo = localStorage.getItem('uploadedCuesVideo');
    if (videoInfo) {
      try {
        return JSON.parse(videoInfo);
      } catch (error) {
        console.error('Error parsing video info:', error);
        localStorage.removeItem('uploadedCuesVideo');
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const videoInfo = localStorage.getItem('uploadedCuesVideo');
      if (videoInfo) {
        try {
          setUploadedVideo(JSON.parse(videoInfo));
        } catch (error) {
          console.error('Error parsing video info:', error);
          localStorage.removeItem('uploadedCuesVideo');
          setUploadedVideo(null);
        }
      } else {
        setUploadedVideo(null);
      }
    };

    window.addEventListener('focus', handleStorageChange);
    return () => {
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  function goBack() {
    navigate('/about-your-pet');
  }

  function goHome() {
    navigate('/home');
  }

  function handleRecord() {
    navigate('/cues-recording');
  }

  function handleUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const videoInfo = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        };
        localStorage.setItem('uploadedCuesVideo', JSON.stringify(videoInfo));
        setUploadedVideo(videoInfo);
      }
    };
    input.click();
  }

  function handleDeleteVideo() {
    localStorage.removeItem('uploadedCuesVideo');
    setUploadedVideo(null);
  }

  return (
    <div className="cues-task-container">
      <div className="cues-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>About your pet</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="cues-content">
        {uploadedVideo && (
          <div className="video-upload-status">
            <div className="upload-icon">📹</div>
            <p className="upload-text">
              <strong>Video uploaded:</strong>
              <span className="video-link">{uploadedVideo.name}</span>
            </p>
            <div className="video-details">
              <small>Size: {(uploadedVideo.size / (1024 * 1024)).toFixed(2)} MB</small>
            </div>
            <button className="delete-video-button" onClick={handleDeleteVideo}>
              Delete Video
            </button>
          </div>
        )}

        <div className="dog-illustration">
          <div className="dogs-image">🐶👋</div>
        </div>

        <div className="instruction-section">
          <h2>Record your dog performing cues</h2>
          <p>Record your dog performing simple cues like sit, down, stay, or come. This shows their training level and responsiveness.</p>
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

export default CuesTask;
