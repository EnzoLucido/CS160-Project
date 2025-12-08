import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutYourDog.css";

function AboutYourPet() {
  const navigate = useNavigate();
  const [selectedTasks, setSelectedTasks] = useState([]);

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

  return (
    <div className="about-pet-container">
      <div className="about-pet-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>About your dog</h1>
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

        </div>
      </div>
    </div>
  );
}

export default AboutYourPet;

