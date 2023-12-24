import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';
import Help from './pages/help/Help';
import Contacts from './pages/contacts/Contacts';
import About from './pages/about/About';
import Health from './pages/health/Health';
import Usage from './pages/usage/Usage';
import CVSHome from './pages/cvs/cvs_home/CVSHome';
import CVSInput from './pages/cvs/cvs_input/CVSInput';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/help' element={<Help />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/about' element={<About />} />
            <Route path='/health' element={<Health />} />
            <Route path='/usage' element={<Usage />} />
            <Route path='/cvs-home' element={<CVSHome />} />
            <Route path='/cvs-input' element={<CVSInput />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
