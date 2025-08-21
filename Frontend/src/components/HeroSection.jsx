// src/components/HeroSection.jsx
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
//import { FaArrowRight } from 'react-icons/fa';
import FeatureCards from './FeaturesCards';

export default function HeroSection() {
  const navigate = useNavigate();
  const featuresRef = useRef(null);

  const handleExploreClick = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 text-white flex flex-col relative overflow-hidden">
      {/* COSMIC ANIMATED ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute bg-white rounded-full opacity-70 animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
        <span className="absolute left-1/4 top-1/3 w-12 h-12 bg-gradient-to-br from-yellow-300 to-purple-600 rounded-full opacity-60 animate-planet" />
        <span className="absolute right-1/3 bottom-1/4 w-40 h-40 bg-purple-500 opacity-30 rounded-full blur-3xl animate-nebula" />
      </div>

      {/* HERO SECTION */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-12 text-center relative z-10">
        <div className="mb-6">
          <img
            src="https://via.placeholder.com/64x64.png?text=🌙"
            alt="Sacred DreamSpace Logo"
            className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-purple-500 shadow-md"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
          <span className="text-white">Sacred </span>
          <span className="text-yellow-400">DreamSpace</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto text-center">
          Unlock the profound wisdom hidden in your dreams with AI-powered interpretations tailored to your spiritual journey.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all"
          >
            Start Your Journey
          </button>
          <button
            onClick={handleExploreClick}
            className="bg-transparent border border-white hover:border-yellow-400 text-white hover:text-yellow-400 font-medium py-3 px-6 rounded-lg transition-all"
          >
            Explore Features
          </button>
        </div>
        <p className="mt-8 text-sm text-gray-400 text-center">
          Join thousands discovering the sacred wisdom of their dreams ✨
        </p>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="py-16 px-6 relative z-10 bg-indigo-950/80">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">How It Works</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {["Set Your Base Personality", "Submit Dream", "Interpretation", "Receive Detailed Analysis"].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center border border-yellow-400/30 rounded-lg p-4 bg-[#2C3253]/80 backdrop-blur-sm">
              <div className="bg-indigo-800 rounded-full w-16 h-16 flex items-center justify-center mb-3 text-2xl font-bold border-4 border-yellow-400">
                {idx + 1}
              </div>
              <div className="font-semibold mb-1 text-center">{step}</div>
              <div className="text-gray-300 text-sm text-center max-w-xs">
                {[
                  "Choose your lens for dream interpretation: symbolic, spiritual, or scientific.",
                  "Enter your dream details in the journal.",
                  "Instantly receive a symbolic, spiritual, or scientific interpretation.",
                  "Get a nurturing, in-depth analysis tailored to your base personality."
                ][idx]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div ref={featuresRef} className="relative z-10 bg-indigo-900/70 py-16">
        <FeatureCards />
      </div>
    </div>
  );
}