import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutYourPet.css';

function AboutYourPet() {
  const navigate = useNavigate();
  const [selectedTasks, setSelectedTasks] = useState([]);

  const tasks = [
    'Walking', 'Indoor', 'Surrounding', 'Cues', 'Children', 'Animals'
  ];

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
                className={`task-button ${selectedTasks.includes(task) ? 'selected' : ''}`}
                onClick={() => toggleTask(task)}
              >
                {task}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutYourPet;