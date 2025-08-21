// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  const isLoggedIn = !!auth.currentUser;

  return (
    <nav className="w-full bg-[#1a1334] border-b border-purple-900 shadow-md fixed top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold -ml-20">
         <span className="text-white">Sacred</span>
         <span className="text-yellow-400"> DreamSpace</span>
        </Link>
        <div className="space-x-4 text-sm md:text-base">
          <Link
            to="/"
            className="hover:text-yellow-300 transition"
          >
            Home
          </Link>
          {isLoggedIn && (
            <>
              <Link
                to="/journal"
                className="hover:text-yellow-300 transition"
              >
                Journal
              </Link>
              <Link
                to="/calendar"
                className="hover:text-yellow-300 transition"
              >
                Calendar
              </Link>
              <Link
                to="/profile"
                className="hover:text-yellow-300 transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="ml-4 bg-purple-700 hover:bg-purple-600 px-3 py-1 rounded text-white font-medium"
              >
                Logout
              </button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-300 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-yellow-300 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}