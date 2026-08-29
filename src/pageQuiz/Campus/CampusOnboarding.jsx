import { useState, useEffect, useContext } from "react";
import { getInstitutions, saveCampusProfile } from "../../apiQuiz/institutionApi";
import { AuthContext } from "../../contextQuiz/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../componentsQuiz/Loader";
import "../proquiz.css";

const LEVELS = ["100L", "200L", "300L", "400L", "500L", "Postgraduate"];
const OTHER = "__other__";

const CampusOnboarding = () => {
  const { refreshProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [institutionSlug, setInstitutionSlug] = useState("");
  const [otherInstitutionName, setOtherInstitutionName] = useState("");
  const [school, setSchool] = useState("");
  const [programme, setProgramme] = useState("");
  const [otherProgramme, setOtherProgramme] = useState("");
  const [level, setLevel] = useState(LEVELS[0]);

  useEffect(() => {
    getInstitutions()
      .then(setInstitutions)
      .catch(() => setInstitutions([]))
      .finally(() => setLoading(false));
  }, []);

  const selectedInstitution = institutions.find((i) => i.slug === institutionSlug);
  const schools = selectedInstitution?.schools || [];
  const selectedSchool = schools.find((s) => s.name === school);
  const programmes = selectedSchool?.programmes || [];

  const handleInstitutionChange = (value) => {
    setInstitutionSlug(value);
    setSchool("");
    setProgramme("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const isOther = institutionSlug === OTHER;
    const finalProgramme = isOther ? otherProgramme.trim() : (programme === OTHER ? otherProgramme.trim() : programme);

    if (isOther && !otherInstitutionName.trim()) {
      setError("Please enter your institution's name.");
      return;
    }
    if (!finalProgramme) {
      setError("Please enter or select your programme.");
      return;
    }

    setSubmitting(true);
    try {
      await saveCampusProfile({
        institutionSlug: isOther ? null : institutionSlug,
        institutionName: isOther ? otherInstitutionName.trim() : selectedInstitution?.name,
        school: isOther ? null : school || null,
        programme: finalProgramme,
        level
      });

      await refreshProfile();
      navigate("/pro/dashboard");
    } catch (err) {
      setError(err.message || "Failed to save your campus profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pq-page">
        <Loader fullPage label="Loading institutions..." />
      </div>
    );
  }

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h2 className="pq-title">Set Up Your Campus Profile</h2>
          <p className="pq-subtitle">
            Tell us where you study so we can tailor quizzes and features to your
            programme. Don't see your school listed? Choose "Other" — we're
            expanding to more universities all the time.
          </p>

          {error && <div className="pq-error-box">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="pq-field-row">
              <div className="pq-field">
                <label>Institution</label>
                <select value={institutionSlug} onChange={(e) => handleInstitutionChange(e.target.value)}>
                  <option value="" disabled>Select your institution</option>
                  {institutions.map((inst) => (
                    <option key={inst.slug} value={inst.slug}>{inst.name}</option>
                  ))}
                  <option value={OTHER}>Other / Not listed</option>
                </select>
              </div>
            </div>

            {institutionSlug === OTHER && (
              <div className="pq-field">
                <label>Institution Name</label>
                <input
                  className="pq-input"
                  placeholder="e.g. University of Lagos"
                  value={otherInstitutionName}
                  onChange={(e) => setOtherInstitutionName(e.target.value)}
                />
              </div>
            )}

            {institutionSlug && institutionSlug !== OTHER && schools.length > 0 && (
              <div className="pq-field-row">
                <div className="pq-field">
                  <label>School / Faculty</label>
                  <select value={school} onChange={(e) => { setSchool(e.target.value); setProgramme(""); }}>
                    <option value="" disabled>Select your school</option>
                    {schools.map((s) => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="pq-field">
                  <label>Programme</label>
                  <select value={programme} onChange={(e) => setProgramme(e.target.value)} disabled={!school}>
                    <option value="" disabled>Select your programme</option>
                    {programmes.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                    <option value={OTHER}>Other / Not listed</option>
                  </select>
                </div>
              </div>
            )}

            {(institutionSlug === OTHER || programme === OTHER) && (
              <div className="pq-field">
                <label>Programme Name</label>
                <input
                  className="pq-input"
                  placeholder="e.g. Mechanical Engineering"
                  value={otherProgramme}
                  onChange={(e) => setOtherProgramme(e.target.value)}
                />
              </div>
            )}

            <div className="pq-field">
              <label>Level</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="pq-btn pq-btn-primary pq-btn-block" disabled={submitting}>
              {submitting ? "Saving..." : "Save & Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampusOnboarding;
