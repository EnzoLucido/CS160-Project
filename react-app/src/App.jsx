import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyDogs from './pages/MyDogs';
import AddDog from './pages/AddDog';
import FirstEntry from './pages/FirstEntry';
import AboutYourDog from './pages/AboutYourDog';
import WalkingTask from './pages/WalkingTask';
import EatingTask from './pages/EatingTask';
import PlayingTask from './pages/PlayingTask';
import CuesTask from './pages/CuesTask';
import ChildrenTask from './pages/ChildrenTask';
import AnimalsTask from './pages/AnimalsTask';
import RecordingPage from './pages/RecordingPage';
import EatingRecording from './pages/EatingRecording';
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
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-dogs" element={<MyDogs />} />
        <Route path="/add-dog" element={<AddDog />} />
        <Route path="/first-entry" element={<FirstEntry />} />
        <Route path="/about-your-dog" element={<AboutYourDog />} />
        <Route path="/walking-task" element={<WalkingTask />} />
        <Route path="/eating-task" element={<EatingTask />} />
        <Route path="/playing-task" element={<PlayingTask />} />
        <Route path="/cues-task" element={<CuesTask />} />
        <Route path="/children-task" element={<ChildrenTask />} />
        <Route path="/animals-task" element={<AnimalsTask />} />
        <Route path="/recording" element={<RecordingPage />} />
        <Route path="/eating-recording" element={<EatingRecording />} />
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
