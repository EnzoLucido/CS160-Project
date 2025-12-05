import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShelterSearch.css';

function ShelterSearch() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function goHome() {
    navigate('/home');
  }

  function handleSearch(e) {
    e.preventDefault();
    navigate('/shelter-detail');
  }

  return (
    <div className="shelter-search-container">
      <div className="shelter-header">
        <button className="back-button" onClick={goBack}>
          &lt;
        </button>
        <h1>Find a shelter</h1>
        <button className="home-button" onClick={goHome}>
          Home
        </button>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Value"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default ShelterSearch;
