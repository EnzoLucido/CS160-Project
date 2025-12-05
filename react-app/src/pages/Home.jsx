import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  function goToProfile() {
    navigate('/profile');
  }

  function goToMyPets() {
    navigate('/my-pets');
  }

   function goToShelterSearch() {
    navigate('/shelter-search');
  }

  function goToStatus() {
    navigate('/status');
  }

  function goToBehaviorAnalysis() {
    navigate('/behavior-analysis');
  }

  function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Shelter Dog Matching App</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="home-content">
        <div className="feature-card" onClick={goToProfile}>
          <h2>Profile</h2>
          <p>View and edit your profile</p>
        </div>

        <div className="feature-card" onClick={goToMyPets}>
          <h2>My Pets</h2>
          <p>Manage your pet information</p>
        </div>

        <div className="feature-card" onClick={goToShelterSearch}>
          <h2>Find a Shelter</h2>
          <p>Search for pet shelters near you</p>
        </div>

        <div className="feature-card" onClick={goToStatus}>
          <h2>Status</h2>
          <p>View the status of matching results</p>
        </div>

        <div className="feature-card" onClick={goToBehaviorAnalysis}>
          <h2>Behavior Analysis</h2>
          <p>Analyze dog behavior videos with AI</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
