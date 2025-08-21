import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { 
  FaTachometerAlt, FaBell, FaUsers, FaBullhorn, FaBook, 
  FaCog, FaTrash, FaSignOutAlt, FaQuestionCircle 
} from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const menuItems = [
  { icon: <FaTachometerAlt />, text: "Dashboard", to: "/profile" },
  { icon: <FaBell />, text: "Notifications", to: "/profile/notifications" },
  { icon: <FaUsers />, text: "Community Forum", to: "/profile/community" },
  { icon: <FaBullhorn />, text: "Promotions", to: "/profile/promotions" },
  { icon: <FaBook />, text: "My Saved Dreams", to: "/profile/saved-dreams" },
  { icon: <FaCog />, text: "Settings", to: "/profile/settings" },
  { icon: <FaTrash />, text: "Trash", to: "/profile/trash" },
  { icon: <FaSignOutAlt />, text: "Logout", to: "/logout" },
  { icon: <FaQuestionCircle />, text: "Help", to: "/profile/help" },
];

export default function ProfilePage() {
  const user = auth.currentUser;
  const location = useLocation();

  return (
    <div style={{ background: "#1A1F3D", minHeight: "100vh", color: "#F8F9FA", display: "flex" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: "#393185", minHeight: "100vh", padding: "2rem 1rem 1rem 1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        
        
        <div className="mb-8">
          <span className="text-yellow-400 text-2xl font-bold">Sacred</span>
          <span className="text-white text-2xl font-bold"> DreamSpace</span>
        </div>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <SidebarButton
              key={item.text}
              icon={item.icon}
              text={item.text}
              to={item.to}
              active={location.pathname === item.to}
            />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", background: "linear-gradient(180deg, #1A1F3D 0%, #2C3253 100%)", minHeight: "100vh" }}>
        {/* User Info */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img
              src={user?.photoURL || "https://ui-avatars.com/api/?name=User"}
              alt="Profile"
              style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: "2px solid #393185" }}
            />
            <div>
              <div className="font-semibold">{user?.displayName || "User Name"}</div>
              <div className="text-xs text-gray-400">{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div style={{ display: "flex", gap: "2rem" }}>
          {/* Graph Card */}
          <section style={{
            background: "#393185",
            borderRadius: "16px",
            padding: "2rem",
            flex: 2,
            minWidth: 0,
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)"
          }}>
            <h2 className="text-xl font-bold mb-4">Dream Mood Analysis</h2>
            <DreamMoodChart />
            <div className="mt-6 flex gap-6">
              <div className="flex items-center gap-2">
                <span style={{ width: 16, height: 16, background: "#FFD600", display: "inline-block", borderRadius: 4 }}></span>
                <span className="text-sm">Happy</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ width: 16, height: 16, background: "#1976D2", display: "inline-block", borderRadius: 4 }}></span>
                <span className="text-sm">Calm</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ width: 16, height: 16, background: "#8E24AA", display: "inline-block", borderRadius: 4 }}></span>
                <span className="text-sm">Anxious</span>
              </div>
            </div>
          </section>

          {/* Analysis Card */}
          <section style={{
            background: "#393185",
            borderRadius: "16px",
            padding: "2rem",
            flex: 1,
            minWidth: 280,
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}>
            <div>
              <div className="text-lg font-bold mb-2">Dream Analysis</div>
              <div className="text-3xl font-extrabold text-yellow-400 mb-2">12 Dreams</div>
              <div className="text-xs text-gray-400">Analyzed over the last 4 days</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Mood Breakdown</div>
              <div className="flex gap-4">
                <div>
                  <span className="text-yellow-400 font-bold">50%</span>
                  <span className="text-xs text-gray-400 ml-1">Happy</span>
                </div>
                <div>
                  <span className="text-blue-400 font-bold">30%</span>
                  <span className="text-xs text-gray-400 ml-1">Calm</span>
                </div>
                <div>
                  <span className="text-purple-400 font-bold">20%</span>
                  <span className="text-xs text-gray-400 ml-1">Anxious</span>
                </div>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">Summary</div>
              <div className="text-xs text-gray-300">
                Your recent dreams have been mostly positive, with a majority reflecting happiness and calmness. Keep journaling to see more trends!
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Sidebar button component for reusability
function SidebarButton({ icon, text, to, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded transition text-left w-full font-medium
        ${active ? "bg-[#393185] text-yellow-400" : "hover:bg-[#393185] text-white"}`}
      style={{ textDecoration: "none" }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span>{text}</span>
    </Link>
  );
}

// DreamMoodChart with recharts line chart
function DreamMoodChart() {
  const [dreamData, setDreamData] = useState([]);

  useEffect(() => {
    // Replace this with your real dream data fetching logic
    setDreamData([
      { date: "2024-08-17", moodScore: 3 },
      { date: "2024-08-18", moodScore: 5 },
      { date: "2024-08-19", moodScore: 2 },
      { date: "2024-08-20", moodScore: 4 },
      { date: "2024-08-21", moodScore: 5 },
    ]);
  }, []);

  return (
    <div style={{
      width: "100%",
      height: 220,
      background: "#393185",
      borderRadius: 12,
      padding: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={dreamData}>
          <CartesianGrid stroke="#2C3253" />
          <XAxis dataKey="date" stroke="#F8F9FA" />
          <YAxis domain={[0, 5]} stroke="#F8F9FA" />
          <Tooltip contentStyle={{ background: "#2C3253", color: "#F8F9FA" }} />
          <Line type="monotone" dataKey="moodScore" stroke="#FFD600" strokeWidth={3} dot={{ r: 5, fill: "#FFD600" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
