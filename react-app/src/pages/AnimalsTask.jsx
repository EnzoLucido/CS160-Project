import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimalsTask.css';

function AnimalsTask() {
  const navigate = useNavigate();

  const [uploadedVideo, setUploadedVideo] = useState(() => {
    const videoInfo = localStorage.getItem('uploadedAnimalsVideo');
    if (videoInfo) {
      try {
        return JSON.parse(videoInfo);
      } catch (error) {
        console.error('Error parsing video info:', error);
        localStorage.removeItem('uploadedAnimalsVideo');
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const videoInfo = localStorage.getItem('uploadedAnimalsVideo');
      if (videoInfo) {
        try {
          setUploadedVideo(JSON.parse(videoInfo));
        } catch (error) {
          console.error('Error parsing video info:', error);
          localStorage.removeItem('uploadedAnimalsVideo');
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
    navigate('/animals-recording');
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
        localStorage.setItem('uploadedAnimalsVideo', JSON.stringify(videoInfo));
        setUploadedVideo(videoInfo);
      }
    };
    input.click();
  }

  function handleDeleteVideo() {
    localStorage.removeItem('uploadedAnimalsVideo');
    setUploadedVideo(null);
  }

  return (
    <div className="animals-task-container">
      <div className="animals-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>About your pet</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="animals-content">
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
          <div className="dogs-image">🐶🐱</div>
        </div>

        <div className="instruction-section">
          <h2>Record your dog with other animals</h2>
          <p>Record your dog interacting with other animals (cats, dogs, etc.). This shows their social behavior with other pets.</p>
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

export default AnimalsTask;