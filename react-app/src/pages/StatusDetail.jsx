import { useNavigate, useLocation } from 'react-router-dom';
import './StatusDetail.css';

function StatusDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const shelterName = location.state?.shelterName || 'Berkeley Humane';

  function goBack() {
    navigate(-1);
  }

  function goHome() {
    navigate('/');
  }

  function handleContact() {
    alert(`Contacting ${shelterName}...`);
  }

  const isPending = shelterName === 'Berkeley Humane';
  const petInfo = isPending
    ? {
        name: 'Fluffy',
        species: 'Cat',
        breed: 'Persian',
        age: '3 years',
        sex: 'Female',
        size: 'Medium'
      }
    : {
        name: 'Max',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: '2 years',
        sex: 'Female',
        size: 'Large'
      };

  const matchResults = [
    {
      name: 'Hazel',
      species: 'Dog',
      breed: 'Mixed Breed (Large)',
      age: '9 years',
      sex: 'Female',
      size: 'Large',
      match: '92%',
      url: 'https://www.rocketdogrescue.org/adopt/adoptees/#sl_embed&page=shelterluv_wrap_1734799677%2Fembed%2Fanimal%2F206031081'
    },
    {
      name: 'Lee Lou',
      species: 'Dog',
      breed: 'Bloodhound / Mix',
      age: '7 years',
      sex: 'Female',
      size: 'Large',
      match: '85%',
      url: 'https://www.rocketdogrescue.org/adopt/adoptees/#sl_embed&page=shelterluv_wrap_1734799677%2Fembed%2Fanimal%2F206031050'
    }
  ];

  return (
    <div className="status-detail-container">
      <div className="status-detail-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>Status</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="status-detail-content">
        <h2 className="shelter-title">{shelterName}</h2>

        <div className="pet-info-section">
          <h3 className="section-title">Your Pet's Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{petInfo.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Species:</span>
              <span className="info-value">{petInfo.species}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Breed:</span>
              <span className="info-value">{petInfo.breed}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age:</span>
              <span className="info-value">{petInfo.age}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Sex:</span>
              <span className="info-value">{petInfo.sex}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Size:</span>
              <span className="info-value">{petInfo.size}</span>
            </div>
          </div>
        </div>

        {isPending ? (
          <div className="pending-section">
            <h3 className="section-title">Status</h3>
            <div className="pending-card">
              <p className="pending-text">
                Your request is currently pending. The shelter is reviewing your pet's information.
              </p>
              <button className="contact-button" onClick={handleContact}>
                Contact Shelter
              </button>
            </div>
          </div>
        ) : (
          <div className="match-section">
            <h3 className="section-title">Match Results</h3>
            {matchResults.map((match, index) => (
              <div key={index} className="match-card">
                <div className="match-header">
                  <h4 className="match-pet-name">{match.name}</h4>
                  <span className="match-percentage">{match.match} Match</span>
                </div>
                <div className="match-details">
                  <p><strong>Species:</strong> {match.species}</p>
                  <p><strong>Breed:</strong> {match.breed}</p>
                  <p><strong>Age:</strong> {match.age}</p>
                  <p><strong>Sex:</strong> {match.sex}</p>
                  <p><strong>Size:</strong> {match.size}</p>
                  <p className="see-more-link">
                    <a href={match.url} target="_blank" rel="noopener noreferrer">
                      See more details →
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusDetail;

