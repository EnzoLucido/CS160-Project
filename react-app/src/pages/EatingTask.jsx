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

  // Add analysis states
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(() => {
    const savedResults = localStorage.getItem('eatingAnalysisResults');
    return savedResults ? JSON.parse(savedResults) : null;
  });
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
    navigate('/about-your-dog');
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
        setSelectedFile(file); // Store the actual file for analysis
      }
    };
    input.click();
  }

  function handleDeleteVideo() {
    localStorage.removeItem('uploadedEatingVideo');
    localStorage.removeItem('eatingAnalysisResults');
    setUploadedVideo(null);
    setSelectedFile(null);
    setResults(null);
  }

  const handleAnalyzeVideo = async () => {
    if (!selectedFile) {
      setError('Please upload a video first');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('files', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/analyze-videos/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze video');
      }

      const data = await response.json();
      setResults(data);
      localStorage.setItem('eatingAnalysisResults', JSON.stringify(data));
    } catch (err) {
      setError('Failed to analyze video: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAggressionLevelColor = (level) => {
    if (!level) return '#6c757d';
    const lowerLevel = level.toLowerCase();
    if (lowerLevel === 'none' || lowerLevel === 'low') return '#28a745';
    if (lowerLevel === 'mild' || lowerLevel === 'moderate' || lowerLevel === 'medium') return '#ffc107';
    if (lowerLevel === 'severe' || lowerLevel === 'high') return '#dc3545';
    return '#6c757d';
  };

  return (
    <div className="eating-task-container">
      <div className="eating-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>About your dog</h1>
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
            <button className="delete-video-button" onClick={handleDeleteVideo}>
              Delete Video
            </button>
          </div>
        )}

        <div className="dog-illustration">
          <div className="dogs-image">🐶🍽️</div>
        </div>

        <div className="instruction-section">
          <h2>Record your dog eating</h2>
          <p>Record your dog eating. In this video, try to dog your dog and take away the food if possible.</p>
        </div>

        <div className="button-section">
          <button className="record-button" onClick={handleRecord}>
            RECORD
          </button>
          <button className="upload-button" onClick={handleUpload}>
            UPLOAD
          </button>
        </div>

        {uploadedVideo && selectedFile && (
          <button
            className={`analyze-button ${loading ? 'disabled' : 'active'}`}
            onClick={handleAnalyzeVideo}
            disabled={loading}
          >
            {loading ? 'Analyzing Video...' : 'Analyze Eating Video'}
          </button>
        )}

        {error && (
          <div className="error-message">
            Error: {error}
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loading-text">Analyzing eating behavior...</div>
            <p>This may take a few minutes.</p>
          </div>
        )}

        {results && (
          <div className="results-section">
            <h2>Eating Behavior Analysis</h2>
            {results.individual_analyses.map((video, index) => (
              <div key={index} className="video-card">
                <h3>{video.video_name}</h3>
                {video.error ? (
                  <div className="video-error">Error: {video.error}</div>
                ) : (
                  <div>
                    <p>
                      <strong>Aggression Level:</strong>
                      <span className="badge" style={{ backgroundColor: getAggressionLevelColor(video.analysis.aggression_level) }}>
                        {video.analysis.aggression_level || 'N/A'}
                      </span>
                    </p>
                    <p><strong>Triggers:</strong> {video.analysis.triggers || 'None'}</p>
                    <p><strong>Warnings Given:</strong> {video.analysis.warnings_given || 'None'}</p>
                    <p><strong>Bite Contact:</strong> {video.analysis.bite_contact ? 'Yes' : 'No'}</p>
                    <p><strong>Description:</strong> {video.analysis.description || 'N/A'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EatingTask;
