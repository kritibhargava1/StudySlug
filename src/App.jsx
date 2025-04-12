import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import Tutors from './pages/Tutors';
import StudyGroups from './pages/StudyGroups';
import Matches from './pages/MatchesPage'; // ✅ keep this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/study-groups" element={<StudyGroups />} />
        <Route path="/matches" element={<Matches />} /> 
      </Routes>
    </Router>
  );
}

export default App;