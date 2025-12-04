import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutYourPet.css';

function AboutYourPet() {
  const navigate = useNavigate();
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Initialize uploadedVideo state directly from localStorage
  const [uploadedVideo, setUploadedVideo] = useState(() => {
    const videoInfo = localStorage.getItem('uploadedVideo');
    if (videoInfo) {
      try {
        return JSON.parse(videoInfo);
      } catch (error) {
        console.error('Error parsing video info:', error);
        localStorage.removeItem('uploadedVideo');
        return null;
      }
    }
    return null;
  });

  const tasks = [
    'Walking', 'Eating', 'Surrounding', 'Cues', 'Children', 'Animals'
  ];

  // Listen for storage changes (when user uploads a new video)
  useEffect(() => {
    const handleStorageChange = () => {
      const videoInfo = localStorage.getItem('uploadedVideo');
      if (videoInfo) {
        try {
          setUploadedVideo(JSON.parse(videoInfo));
        } catch (error) {
          console.error('Error parsing video info:', error);
          localStorage.removeItem('uploadedVideo');
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

  function toggleTask(task) {
    if (task === 'Walking') {
      navigate('/walking-task');
      return;
    }

    setSelectedTasks(prev =>
      prev.includes(task)
        ? prev.filter(t => t !== task)
        : [...prev, task]
    );
  }

  return (
    <div className="about-pet-container">
      <div className="about-pet-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>About your pet</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="about-pet-content">
        <div className="task-section">
          <h2>Please Complete the Following Tasks</h2>

          <div className="task-grid">
            {tasks.map(task => (
              <button
                key={task}
                className={`task-button ${selectedTasks.includes(task) ? 'selected' : ''} ${task === 'Walking' && uploadedVideo ? 'completed' : ''}`}
                onClick={() => toggleTask(task)}
              >
                {task}
                {task === 'Walking' && uploadedVideo && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutYourPet;
