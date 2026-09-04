import { useState, useEffect } from "react";
import { saveCareerProfile, getCareerProfile } from "../../apiQuiz/careerApi";
import Loader from "../../componentsQuiz/Loader";
import "../proquiz.css";

const CareerCoach = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  const [careerGoal, setCareerGoal] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [interestsInput, setInterestsInput] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getCareerProfile()
      .then((res) => {
        setProfile(res);
        setCareerGoal(res.careerGoal);
        setSkillsInput(res.currentSkills.join(", "));
        setInterestsInput(res.interests.join(", "));
      })
      .catch(() => setEditing(true)) // no profile yet — show the form
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!careerGoal.trim()) {
      setError("Please enter a career goal.");
      return;
    }

    setGenerating(true);
    try {
      const res = await saveCareerProfile({
        careerGoal,
        currentSkills: skillsInput.split(",").map((s) => s.trim()).filter(Boolean),
        interests: interestsInput.split(",").map((s) => s.trim()).filter(Boolean)
      });
      setProfile(res);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="pq-page">
        <Loader fullPage label="Loading your career profile..." />
      </div>
    );
  }

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h2 className="pq-title">AI Career Coach</h2>
          <p className="pq-subtitle">
            Tell us where you want to go, and we'll map out a realistic path to get there.
          </p>

          {error && <div className="pq-error-box">{error}</div>}

          {editing || !profile ? (
            <form onSubmit={handleSubmit}>
              <div className="pq-field">
                <label>Career Goal</label>
                <input
                  className="pq-input"
                  placeholder="e.g. Machine Learning Engineer"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                />
              </div>

              <div className="pq-field">
                <label>Current Skills (comma-separated)</label>
                <input
                  className="pq-input"
                  placeholder="e.g. Python, HTML/CSS, Excel"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                />
              </div>

              <div className="pq-field">
                <label>Interests (comma-separated)</label>
                <input
                  className="pq-input"
                  placeholder="e.g. Data, AI, Web Development"
                  value={interestsInput}
                  onChange={(e) => setInterestsInput(e.target.value)}
                />
              </div>

              <button type="submit" className="pq-btn pq-btn-primary pq-btn-block" disabled={generating}>
                {generating ? "Building your roadmap..." : profile ? "Regenerate Roadmap" : "Generate My Roadmap"}
              </button>
            </form>
          ) : (
            <>
              <div className="pq-stats-row">
                <span className="pq-badge pq-badge-premium">{profile.careerGoal}</span>
              </div>
              <button className="pq-btn" style={{ marginTop: 14 }} onClick={() => setEditing(true)}>
                Edit Goal / Regenerate
              </button>
            </>
          )}
        </div>

        {profile && !editing && profile.roadmap?.steps?.length > 0 && (
          <>
            <div className="pq-card">
              <h4 className="pq-section-title">Your Roadmap</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {profile.roadmap.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: "linear-gradient(90deg, #00f5ff, #7b2ff7)",
                        color: "#04040a", fontWeight: 700, fontSize: 12,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                      }}>
                        {i + 1}
                      </div>
                      {i < profile.roadmap.steps.length - 1 && (
                        <div style={{ width: 2, flex: 1, minHeight: 24, background: "rgba(255,255,255,0.1)" }} />
                      )}
                    </div>
                    <p style={{ fontSize: 14, color: "#e2e8f0", paddingBottom: 20 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {profile.roadmap.recommendedSkills?.length > 0 && (
              <div className="pq-card">
                <h4 className="pq-section-title">Skills to Focus On Next</h4>
                <div>
                  {profile.roadmap.recommendedSkills.map((s, i) => (
                    <span className="pq-weak-topic" key={i}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            {profile.roadmap.recommendedProjects?.length > 0 && (
              <div className="pq-card">
                <h4 className="pq-section-title">Project Ideas for Your Portfolio</h4>
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  {profile.roadmap.recommendedProjects.map((p, i) => (
                    <li key={i} style={{ marginBottom: 8, color: "#cbd5e1", fontSize: 14 }}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CareerCoach;
