import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdDetails from './pages/AdDetails.jsx';
import Navbar from './components/Navbar';
import CreateAd from './pages/CreateAd';
import EditAd from './pages/EditAd.jsx';
import MyAds from './pages/MyAds';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ads/:id" element={<AdDetails />} />
        <Route path="/edit/:id" element={<EditAd />} />
        <Route path="/create" element={<CreateAd />} />
        <Route path="/my-ads" element={<MyAds />} />
        <Route path="*" element={<h2>404 — Страница не найдена</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
