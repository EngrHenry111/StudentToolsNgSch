import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";
import "./adminDashboard.css";

const AdminDashboard = () => {

 const navigate = useNavigate();

 const [stats, setStats] = useState({
  total: 0,
  published: 0,
  drafts: 0,
  views: 0
 });

 const [fullStats, setFullStats] = useState(null);

 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");

  // ---- Grant/Revoke Pro ----
 const [proSearchEmail, setProSearchEmail] = useState("");
 const [proSearchResult, setProSearchResult] = useState(null);
 const [proSearchError, setProSearchError] = useState("");
 const [proSearching, setProSearching] = useState(false);
 const [proToggling, setProToggling] = useState(false);

 const handleProSearch = async (e) => {
  e.preventDefault();
  setProSearchError("");
  setProSearchResult(null);

  if (!proSearchEmail.trim()) return;

  setProSearching(true);
  try {
   const token = localStorage.getItem("adminToken");
   const res = await API.get(`/admin/users/find?email=${encodeURIComponent(proSearchEmail.trim())}`, {
    headers: { Authorization: `Bearer ${token}` }
   });
   setProSearchResult(res.data);
  } catch (err) {
   setProSearchError(err.response?.data?.message || "User not found");
  } finally {
   setProSearching(false);
  }
 };

 const handleTogglePro = async () => {
  if (!proSearchResult) return;

  setProToggling(true);
  try {
   const token = localStorage.getItem("adminToken");
   const res = await API.post(`/admin/users/${proSearchResult._id}/toggle-pro`, {}, {
    headers: { Authorization: `Bearer ${token}` }
   });
   setProSearchResult((prev) => ({ ...prev, isPremium: res.data.isPremium, subscriptionStatus: res.data.subscriptionStatus }));
  } catch (err) {
   setProSearchError(err.response?.data?.message || "Failed to update Pro status");
  } finally {
   setProToggling(false);
  }
 };

 useEffect(() => {
  fetchStats();
  fetchFullStats();
 }, []);

 const fetchStats = async () => {
  try {

   const token = localStorage.getItem("adminToken");

   const res = await API.get("/admin/stats", {
    headers: {
     Authorization: `Bearer ${token}`
    }
   });

   setStats(res.data);

  } catch (err) {
   console.error(err);
   setError("Failed to load dashboard stats");
  } finally {
   setLoading(false);
  }
 };

 const fetchFullStats = async () => {
  try {
   const res = await API.get("/admin/full-stats");
   setFullStats(res.data);
  } catch (err) {
   console.error("Failed to load quiz/curated stats:", err);
  }
 };

 const handleLogout = () => {
  localStorage.removeItem("adminToken");
  navigate("/admin/login");
 };

 const accuracy = (correct, attempts) =>
  attempts > 0 ? `${Math.round((correct / attempts) * 100)}%` : "—";

 return (

  <div className="admin-dashboard">

   <h1>Admin Dashboard</h1>

   {loading && <p className="admin-loading">Loading dashboard...</p>}

   {error && <p className="admin-error">{error}</p>}

   {!loading && !error && (
    <>
     <h2 className="admin-section-title">Tutorials</h2>
     <div className="admin-stats">

      <div className="stat-card">
       <h3>Total Tutorials</h3>
       <p>{stats.total}</p>
      </div>

      <div className="stat-card">
       <h3>Published</h3>
       <p>{stats.published}</p>
      </div>

      <div className="stat-card">
       <h3>Drafts</h3>
       <p>{stats.drafts}</p>
      </div>

      <div className="stat-card">
       <h3>Total Views</h3>
       <p>{stats.views}</p>
      </div>

     </div>

     {/* ================= FREE QUIZ ================= */}
     <h2 className="admin-section-title">Free Quiz</h2>
     <div className="admin-stats">

      <div className="stat-card">
       <h3>Unique Players</h3>
       <p>{fullStats?.freeQuiz.uniquePlayers ?? "—"}</p>
      </div>

      <div className="stat-card">
       <h3>Total Attempts</h3>
       <p>{fullStats?.freeQuiz.totalAttempts ?? "—"}</p>
      </div>

      <div className="stat-card">
       <h3>Correct Answers</h3>
       <p>{fullStats?.freeQuiz.totalCorrect ?? "—"}</p>
      </div>

      <div className="stat-card">
       <h3>Accuracy</h3>
       <p>{fullStats ? accuracy(fullStats.freeQuiz.totalCorrect, fullStats.freeQuiz.totalAttempts) : "—"}</p>
      </div>

     </div>

     {/* ================= PRO QUIZ ================= */}
     <h2 className="admin-section-title">Pro Quiz</h2>
     <div className="admin-stats">

      <div className="stat-card">
       <h3>Total Users</h3>
       <p>{fullStats?.proQuiz.totalUsers ?? "—"}</p>
      </div>

      <div className="stat-card">
       <h3>Pro Subscribers</h3>
       <p>{fullStats?.proQuiz.premiumUsers ?? "—"}</p>
      </div>

      <div className="stat-card">
       <h3>Free Plan Users</h3>
       <p>{fullStats?.proQuiz.freeUsers ?? "—"}</p>
      </div>

      <div className="stat-card">
       <h3>Total XP Earned</h3>
       <p>{fullStats?.proQuiz.totalXP ?? "—"}</p>
      </div>

      <div className="stat-card">
       <h3>Pro Attempts</h3>
       <p>{fullStats?.proQuiz.totalAttempts ?? "—"}</p>
      </div>

      <div className="stat-card">
       <h3>Pro Accuracy</h3>
       <p>{fullStats ? accuracy(fullStats.proQuiz.totalCorrect, fullStats.proQuiz.totalAttempts) : "—"}</p>
      </div>

      <div className="stat-card">
       <h3>AI Questions Cached</h3>
       <p>{fullStats?.proQuiz.aiGeneratedQuestions ?? "—"}</p>
      </div>

     </div>

     {/* ================= CURATED QUESTIONS ================= */}
     <h2 className="admin-section-title">Curated Questions (WAEC/JAMB)</h2>
     <div className="admin-stats">

      <div className="stat-card">
       <h3>Total Curated</h3>
       <p>{fullStats?.curatedQuestions.total ?? "—"}</p>
      </div>

      {fullStats && Object.entries(fullStats.curatedQuestions.byExamBody).map(([exam, count]) => (
       <div className="stat-card" key={exam}>
        <h3>{exam}</h3>
        <p>{count}</p>
       </div>
      ))}

     </div>

     {fullStats && Object.keys(fullStats.curatedQuestions.bySubject).length > 0 && (
      <div className="admin-subject-breakdown">
       <h3>By subject</h3>
       <div className="admin-subject-tags">
        {Object.entries(fullStats.curatedQuestions.bySubject).map(([subject, count]) => (
         <span className="admin-subject-tag" key={subject}>
          {subject}: {count}
         </span>
        ))}
       </div>
      </div>
     )}
    </>
   )}

   <button onClick={handleLogout} className="logout-btn">
    Logout
   </button>

   <h2 className="admin-section-title">Grant / Revoke Pro Access</h2>

   <form className="admin-pro-search" onSubmit={handleProSearch}>
    <input
     type="email"
     placeholder="Student's email address"
     value={proSearchEmail}
     onChange={(e) => setProSearchEmail(e.target.value)}
    />
    <button type="submit" disabled={proSearching}>
     {proSearching ? "Searching..." : "Search"}
    </button>
   </form>

   {proSearchError && <p className="admin-error">{proSearchError}</p>}

   {proSearchResult && (
    <div className="admin-pro-result">
     <div>
      <strong>{proSearchResult.username}</strong> ({proSearchResult.email})
      <br />
      Status: {proSearchResult.isPremium ? "Pro (active)" : "Free"}
     </div>
     <button
      onClick={handleTogglePro}
      disabled={proToggling}
      className={proSearchResult.isPremium ? "admin-revoke-btn" : "admin-grant-btn"}
     >
      {proToggling ? "Updating..." : proSearchResult.isPremium ? "Revoke Pro" : "Grant Pro"}
     </button>
    </div>
   )}

   <div className="admin-grid">

    <Link to="/admin/tutorials" className="admin-card">
     Manage Tutorials
    </Link>

    <Link to="/admin/create-tutorial" className="admin-card">
     Create Tutorial
    </Link>

    <Link to="/admin/curated-questions" className="admin-card">
     Curated Questions
    </Link>

    <Link to="/admin/institutions" className="admin-card">
     Institutions
    </Link>

    <Link to="/admin/messages" className="admin-card">
     View Messages
    </Link>

    <Link to="/admin/analytics" className="admin-card">
     Analytics
    </Link>

   </div>

  </div>

 );

};

export default AdminDashboard;