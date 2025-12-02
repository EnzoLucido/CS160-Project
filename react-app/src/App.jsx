import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyPets from './pages/MyPets';
import AddPet from './pages/AddPet';
import ShelterSearch from './pages/ShelterSearch';
import ShelterDetail from './pages/ShelterDetail';
import Confirmation from './pages/Confirmation';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-pets" element={<MyPets />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/shelter-search" element={<ShelterSearch />} />
        <Route path="/shelter-detail" element={<ShelterDetail />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
