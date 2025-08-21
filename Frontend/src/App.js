// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import MultiStepProfile from "./components/MultiStepProfile";
import JournalPage from "./components/JournalPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/ProfilePage";


function App() {
  return (
    <Router>
      <Navbar />
          <div className="pt-12"> {/* pushes content below navbar */}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/setup-profile" element={<MultiStepProfile />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
     </div>
    </Router>
  );
}

export default App;