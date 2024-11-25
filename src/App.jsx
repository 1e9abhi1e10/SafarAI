import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import SignUpPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PlannerPage from './pages/PlannerPage';
import TravelPage from './pages/TravelPage';
import { LoadScript } from '@react-google-maps/api';

function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY
  console.log(apiKey)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new-trip" element={<PlannerPage />} />
        <Route path="/travel" element={<TravelPage />} />
        {/* <Route path="/other" element={<OtherPage />} /> Example route for another page */}
      </Routes>
    </Router>
  );
}

export default App;
