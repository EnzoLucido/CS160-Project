import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  function goToShelterSearch() {
    navigate('/shelter-search');
  }

  function goToMyPets() {
    alert('My Pets feature coming soon!');
  }

  function goToProfile() {
    alert('Profile feature coming soon!');
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Pet Shelter App</h1>
      </div>

      <div className="home-content">
        <div className="feature-card" onClick={goToShelterSearch}>
          <h2>Find a Shelter</h2>
          <p>Search for pet shelters near you</p>
        </div>

        <div className="feature-card" onClick={goToMyPets}>
          <h2>My Pets</h2>
          <p>Manage your pet information</p>
        </div>

        <div className="feature-card" onClick={goToProfile}>
          <h2>Profile</h2>
          <p>View and edit your profile</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
