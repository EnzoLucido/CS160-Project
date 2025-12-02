import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyPets from './pages/MyPets';
import AddPet from './pages/AddPet';
import ShelterSearch from './pages/ShelterSearch';
import ShelterDetail from './pages/ShelterDetail';
import Confirmation from './pages/Confirmation';
import Status from './pages/Status';
import StatusDetail from './pages/StatusDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-pets" element={<MyPets />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shelter-search" element={<ShelterSearch />} />
        <Route path="/shelter-detail" element={<ShelterDetail />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/status" element={<Status />} />
        <Route path="/status-detail" element={<StatusDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
