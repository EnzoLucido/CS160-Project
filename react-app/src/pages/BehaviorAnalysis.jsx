import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BehaviorAnalysis.css';

function BehaviorAnalysis() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      setError('Please select at least one video file');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('http://localhost:8000/analyze-videos/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze videos');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
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
    <div className="behavior-analysis-container">
      <div className="behavior-analysis-header">
        <h1>Dog Behavior Video Analysis</h1>
        <button onClick={() => navigate('/home')} className="back-button">
          Back to Home
        </button>
      </div>

      <div className="upload-section">
        <h2>Upload Dog Behavior Videos</h2>
        <p>Upload one or more videos of dog behavior assessments to receive a comprehensive analysis.</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="video-upload" className="file-input-label">
              Select Videos
            </label>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {selectedFiles.length > 0 && (
            <div>
              <h3>Selected Files ({selectedFiles.length}):</h3>
              <ul className="file-list">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="file-item">
                    <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    <button type="button" onClick={() => handleRemoveFile(index)} className="remove-button">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || selectedFiles.length === 0}
            className={`analyze-button ${loading || selectedFiles.length === 0 ? 'disabled' : 'active'}`}
          >
            {loading ? 'Analyzing Videos...' : 'Analyze Videos'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            Error: {error}
          </div>
        )}
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-text">Analyzing videos...</div>
          <p>This may take a few minutes depending on the number and size of videos.</p>
        </div>
      )}

      {results && (
        <div>
          <div className="results-container">
            <h2>Comprehensive Behavioral Assessment</h2>
            <div style={{ marginTop: '20px' }}>
              <div style={{ marginBottom: '15px' }}>
                <strong>Overall Aggression Level:</strong>
                <span className="badge" style={{ backgroundColor: getAggressionLevelColor(results.comprehensive_analysis.overall_aggression_level) }}>
                  {results.comprehensive_analysis.overall_aggression_level || 'N/A'}
                </span>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong>Common Triggers:</strong>
                <ul>
                  {results.comprehensive_analysis.common_triggers?.map((trigger, index) => (
                    <li key={index}>{trigger}</li>
                  )) || <li>None identified</li>}
                </ul>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong>Warning Patterns:</strong>
                <p>{results.comprehensive_analysis.warning_patterns || 'N/A'}</p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong>Summary:</strong>
                <p>{results.comprehensive_analysis.summary || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div>
            <h2>Individual Video Analyses</h2>
            {results.individual_analyses.map((video, index) => (
              <div key={index} className="video-card">
                <h3>Video {index + 1}: {video.video_name}</h3>
                {video.error ? (
                  <div className="video-error">Error: {video.error}</div>
                ) : (
                  <div>
                    <p>
                      <strong>Aggression Level:</strong>
                      <span className="badge small" style={{ backgroundColor: getAggressionLevelColor(video.analysis.aggression_level) }}>
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
        </div>
      )}
    </div>
  );
}

export default BehaviorAnalysis;
