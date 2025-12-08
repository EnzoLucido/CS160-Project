import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutYourDog.css';

function AboutYourDog() {
  const navigate = useNavigate();
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Check for uploaded videos
  const [uploadedWalkingVideo, setUploadedWalkingVideo] = useState(() => {
    const videoInfo = localStorage.getItem('uploadedVideo');
    return videoInfo ? JSON.parse(videoInfo) : null;
  });

  const [uploadedEatingVideo, setUploadedEatingVideo] = useState(() => {
    const videoInfo = localStorage.getItem('uploadedEatingVideo');
    return videoInfo ? JSON.parse(videoInfo) : null;
  });

  const [uploadedPlayingVideo, setUploadedPlayingVideo] = useState(() => {
    const videoInfo = localStorage.getItem('uploadedPlayingVideo');
    return videoInfo ? JSON.parse(videoInfo) : null;
  });

  const [uploadedCuesVideo, setUploadedCuesVideo] = useState(() => {
    const videoInfo = localStorage.getItem('uploadedCuesVideo');
    return videoInfo ? JSON.parse(videoInfo) : null;
  });

  const [uploadedChildrenVideo, setUploadedChildrenVideo] = useState(() => {
    const videoInfo = localStorage.getItem('uploadedChildrenVideo');
    return videoInfo ? JSON.parse(videoInfo) : null;
  });

  const [uploadedAnimalsVideo, setUploadedAnimalsVideo] = useState(() => {
    const videoInfo = localStorage.getItem('uploadedAnimalsVideo');
    return videoInfo ? JSON.parse(videoInfo) : null;
  });

  const tasks = [
    'Walking', 'Eating', 'Playing', 'Cues', 'Children', 'Animals'
  ];

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const walkingVideo = localStorage.getItem('uploadedVideo');
      const eatingVideo = localStorage.getItem('uploadedEatingVideo');
      const playingVideo = localStorage.getItem('uploadedPlayingVideo');
      const cuesVideo = localStorage.getItem('uploadedCuesVideo');
      const childrenVideo = localStorage.getItem('uploadedChildrenVideo');
      const animalsVideo = localStorage.getItem('uploadedAnimalsVideo');

      setUploadedWalkingVideo(walkingVideo ? JSON.parse(walkingVideo) : null);
      setUploadedEatingVideo(eatingVideo ? JSON.parse(eatingVideo) : null);
      setUploadedPlayingVideo(playingVideo ? JSON.parse(playingVideo) : null);
      setUploadedCuesVideo(cuesVideo ? JSON.parse(cuesVideo) : null);
      setUploadedChildrenVideo(childrenVideo ? JSON.parse(childrenVideo) : null);
      setUploadedAnimalsVideo(animalsVideo ? JSON.parse(animalsVideo) : null);
    };

    window.addEventListener('focus', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('focus', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleAnalyzeVideos = async () => {
    const videos = [];

    if (uploadedWalkingVideo) {
      videos.push({ ...uploadedWalkingVideo, taskType: 'Walking' });
    }
    if (uploadedEatingVideo) {
      videos.push({ ...uploadedEatingVideo, taskType: 'Eating' });
    }
    if (uploadedPlayingVideo) {
      videos.push({ ...uploadedPlayingVideo, taskType: 'Playing' });
    }
    if (uploadedCuesVideo) {
      videos.push({ ...uploadedCuesVideo, taskType: 'Cues' });
    }
    if (uploadedChildrenVideo) {
      videos.push({ ...uploadedChildrenVideo, taskType: 'Children' });
    }
    if (uploadedAnimalsVideo) {
      videos.push({ ...uploadedAnimalsVideo, taskType: 'Animals' });
    }

    if (videos.length === 0) {
      setError('Please upload at least one video');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock results based on all uploaded videos
      const mockResults = {
        individual_analyses: videos.map((video) => ({
          video_name: `${video.taskType} Task - ${video.name}`,
          analysis: {
            aggression_level: getRandomAggressionLevel(video.taskType),
            triggers: getRandomTriggers(video.taskType),
            warnings_given: getRandomWarnings(),
            bite_contact: Math.random() < 0.1,
            description: `Dog showed behavioral responses during ${video.taskType.toLowerCase()} assessment.`
          }
        })),
        comprehensive_analysis: {
          overall_aggression_level: videos.length > 2 ? 'Moderate' : 'Low',
          common_triggers: getCommonTriggers(videos),
          warning_patterns: `Analysis based on ${videos.length} task${videos.length > 1 ? 's' : ''}: ${videos.map(v => v.taskType).join(', ')}`,
          summary: `Comprehensive analysis of ${videos.length} behavioral assessment${videos.length > 1 ? 's' : ''} across multiple contexts.`
        }
      };

      setResults(mockResults);
    } catch (err) {
      setError('Failed to analyze videos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for mock data
  const getRandomAggressionLevel = (taskType) => {
    const levels = ['Low', 'Moderate', 'High'];
    if (taskType === 'Eating') return levels[Math.floor(Math.random() * 3)];
    if (taskType === 'Children' || taskType === 'Animals') return levels[Math.floor(Math.random() * 2)]; // Low or Moderate
    return levels[0]; // Low for Walking, Playing, Cues
  };

  const getRandomTriggers = (taskType) => {
    const triggers = {
      Walking: ['Leash tension', 'Other dogs', 'Loud noises'],
      Eating: ['Hand approach', 'Food guarding', 'Bowl touching'],
      Playing: ['Toy removal', 'Overstimulation', 'Interruption'],
      Cues: ['Command confusion', 'Distractions', 'Frustration'],
      Children: ['Quick movements', 'High voices', 'Touching'],
      Animals: ['Territory', 'Resource comdogition', 'Social hierarchy']
    };
    const taskTriggers = triggers[taskType] || ['None'];
    return taskTriggers[Math.floor(Math.random() * taskTriggers.length)];
  };

  const getRandomWarnings = () => {
    const warnings = ['None', 'Growling', 'Stiffness', 'Lip lifting', 'Backing away'];
    return warnings[Math.floor(Math.random() * warnings.length)];
  };

  const getCommonTriggers = (videos) => {
    const allTriggers = videos.map(v => getRandomTriggers(v.taskType));
    return [...new Set(allTriggers)];
  };

  const getAggressionLevelColor = (level) => {
    if (!level) return '#6c757d';
    const lowerLevel = level.toLowerCase();
    if (lowerLevel === 'none' || lowerLevel === 'low') return '#28a745';
    if (lowerLevel === 'mild' || lowerLevel === 'moderate' || lowerLevel === 'medium') return '#ffc107';
    if (lowerLevel === 'severe' || lowerLevel === 'high') return '#dc3545';
    return '#6c757d';
  };

  function goBack() {
    navigate('/first-entry');
  }

  function goHome() {
    navigate('/home');
  }

  function toggleTask(task) {
    if (task === 'Walking') {
      navigate('/walking-task');
      return;
    }

    if (task === 'Eating') {
      navigate('/eating-task');
      return;
    }

    if (task === 'Playing') {
      navigate('/playing-task');
      return;
    }

    if (task === 'Cues') {
      navigate('/cues-task');
      return;
    }

    if (task === 'Children') {
      navigate('/children-task');
      return;
    }

    if (task === 'Animals') {
      navigate('/animals-task');
      return;
    }

    setSelectedTasks(prev =>
      prev.includes(task)
        ? prev.filter(t => t !== task)
        : [...prev, task]
    );
  }

  const getUploadedVideoForTask = (task) => {
    switch (task) {
      case 'Walking': return uploadedWalkingVideo;
      case 'Eating': return uploadedEatingVideo;
      case 'Playing': return uploadedPlayingVideo;
      case 'Cues': return uploadedCuesVideo;
      case 'Children': return uploadedChildrenVideo;
      case 'Animals': return uploadedAnimalsVideo;
      default: return null;
    }
  };

  const hasAnyUploadedVideo = () => {
    return uploadedWalkingVideo || uploadedEatingVideo || uploadedPlayingVideo ||
           uploadedCuesVideo || uploadedChildrenVideo || uploadedAnimalsVideo;
  };

  return (
    <div className="about-dog-container">
      <div className="about-dog-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>About your dog</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="about-dog-content">
        <div className="task-section">
          <h2>Please Complete the Following Tasks</h2>

          <div className="task-grid">
            {tasks.map(task => (
              <button
                key={task}
                className={`task-button ${selectedTasks.includes(task) ? 'selected' : ''} ${
                  getUploadedVideoForTask(task) ? 'completed' : ''
                }`}
                onClick={() => toggleTask(task)}
              >
                {task}
                {getUploadedVideoForTask(task) &&
                  <span className="checkmark">✓</span>
                }
              </button>
            ))}
          </div>

          {hasAnyUploadedVideo() && (
            <button
              className={`analyze-videos-button ${loading ? 'disabled' : 'active'}`}
              onClick={handleAnalyzeVideos}
              disabled={loading}
            >
              {loading ? 'Analyzing Videos...' : 'Analyze Videos'}
            </button>
          )}

          {error && (
            <div className="error-message">
              Error: {error}
            </div>
          )}
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loading-text">Analyzing task videos...</div>
            <p>Processing walking and eating behavior patterns...</p>
          </div>
        )}

        {results && (
          <div className="results-section">
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
              <h2>Individual Task Analyses</h2>
              {results.individual_analyses.map((video, index) => (
                <div key={index} className="video-card">
                  <h3>{video.video_name}</h3>
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
    </div>
  );
}

export default AboutYourDog;
