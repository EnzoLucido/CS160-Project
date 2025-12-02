import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShelterSearch from './pages/ShelterSearch';
import ShelterDetail from './pages/ShelterDetail';
import Confirmation from './pages/Confirmation';
import Status from './pages/Status';
import StatusDetail from './pages/StatusDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shelter-search" element={<ShelterSearch />} />
        <Route path="/shelter-detail" element={<ShelterDetail />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/status" element={<Status />} />
        <Route path="/status-detail" element={<StatusDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
