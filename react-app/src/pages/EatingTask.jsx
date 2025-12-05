import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EatingTask.css';

function EatingTask() {
  const navigate = useNavigate();

  // Initialize uploadedVideo state directly from localStorage
  const [uploadedVideo, setUploadedVideo] = useState(() => {
    const videoInfo = localStorage.getItem('uploadedEatingVideo');
    if (videoInfo) {
      try {
        return JSON.parse(videoInfo);
      } catch (error) {
        console.error('Error parsing video info:', error);
        localStorage.removeItem('uploadedEatingVideo');
        return null;
      }
    }
    return null;
  });

  // Listen for storage changes (when user uploads a new video)
  useEffect(() => {
    const handleStorageChange = () => {
      const videoInfo = localStorage.getItem('uploadedEatingVideo');
      if (videoInfo) {
        try {
          setUploadedVideo(JSON.parse(videoInfo));
        } catch (error) {
          console.error('Error parsing video info:', error);
          localStorage.removeItem('uploadedEatingVideo');
          setUploadedVideo(null);
        }
      } else {
        setUploadedVideo(null);
      }
    };

    // Listen for focus events (when user returns to this tab/page)
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  function goBack() {
    navigate(-1);
  }

  function goHome() {
    navigate('/home');
  }

  function handleRecord() {
    navigate('/eating-recording');
  }

  function handleUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Store the video file info in localStorage
        const videoInfo = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        };
        localStorage.setItem('uploadedEatingVideo', JSON.stringify(videoInfo));
        setUploadedVideo(videoInfo);
      }
    };
    input.click();
  }

  return (
    <div className="eating-task-container">
      <div className="eating-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>About your pet</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="eating-content">
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
          </div>
        )}

        <div className="dog-illustration">
          <div className="dogs-image">🐕 🍽️</div>
        </div>

        <div className="instruction-section">
          <h2>Record your dog eating</h2>
          <p>Record your dog eating for about 2 minutes. In this video, try to pet your dog and take away the food is possible.</p>
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

export default EatingTask;