import { useState, useEffect } from "react";
import API from "../../services/api";
import "./adminInstitutions.css";

const emptySchool = { name: "", programmes: "" };

const AdminInstitutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [schools, setSchools] = useState([{ ...emptySchool }]);

  const loadInstitutions = async () => {
    setLoading(true);
    try {
      const res = await API.get("/institutions/admin/all");
      setInstitutions(res.data);
    } catch (err) {
      console.error("Failed to load institutions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInstitutions();
  }, []);

  const autoSlug = (value) => {
    setName(value);
    setSlug(value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  };

  const updateSchool = (index, field, value) => {
    setSchools((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const addSchoolRow = () => setSchools((prev) => [...prev, { ...emptySchool }]);
  const removeSchoolRow = (index) => setSchools((prev) => prev.filter((_, i) => i !== index));

  const resetForm = () => {
    setName("");
    setSlug("");
    setSchools([{ ...emptySchool }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!name.trim() || !slug.trim()) {
      setError("Institution name and slug are required.");
      return;
    }

    const cleanSchools = schools
      .filter((s) => s.name.trim())
      .map((s) => ({
        name: s.name.trim(),
        programmes: s.programmes
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean)
      }));

    setSubmitting(true);
    try {
      await API.post("/institutions/admin", {
        name: name.trim(),
        slug: slug.trim(),
        schools: cleanSchools
      });

      setMessage("Institution added successfully.");
      resetForm();
      loadInstitutions();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add institution.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (institution) => {
    try {
      await API.put(`/institutions/admin/${institution._id}`, { active: !institution.active });
      loadInstitutions();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update institution.");
    }
  };

  const handleDelete = async (institution) => {
    if (!window.confirm(`Delete "${institution.name}"? This can't be undone.`)) return;

    try {
      await API.delete(`/institutions/admin/${institution._id}`);
      setInstitutions((prev) => prev.filter((i) => i._id !== institution._id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete institution.");
    }
  };

  return (
    <div className="admin-inst">
      <h1>Institutions</h1>
      <p className="admin-inst-subtitle">
        Manage the universities students can select during Campus onboarding.
        The platform isn't locked to any single institution — add as many as you need.
      </p>

      {/* ============ ADD FORM ============ */}
      <form className="admin-inst-form" onSubmit={handleSubmit}>
        <h2>Add an institution</h2>

        {message && <div className="admin-inst-success">{message}</div>}
        {error && <div className="admin-inst-error">{error}</div>}

        <div className="admin-inst-row">
          <div className="admin-inst-field">
            <label>Institution Name</label>
            <input
              placeholder="e.g. University of Lagos"
              value={name}
              onChange={(e) => autoSlug(e.target.value)}
            />
          </div>

          <div className="admin-inst-field">
            <label>Slug (auto-generated, editable)</label>
            <input
              placeholder="e.g. unilag"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
        </div>

        <label className="admin-inst-schools-label">
          Schools / Faculties (each with comma-separated programmes)
        </label>

        {schools.map((school, i) => (
          <div className="admin-inst-school-row" key={i}>
            <input
              placeholder="School name, e.g. School of Computing"
              value={school.name}
              onChange={(e) => updateSchool(i, "name", e.target.value)}
            />
            <input
              placeholder="Programmes, comma-separated, e.g. Computer Science, Cybersecurity"
              value={school.programmes}
              onChange={(e) => updateSchool(i, "programmes", e.target.value)}
            />
            {schools.length > 1 && (
              <button type="button" className="admin-inst-remove-row" onClick={() => removeSchoolRow(i)}>
                ✕
              </button>
            )}
          </div>
        ))}

        <button type="button" className="admin-inst-add-row" onClick={addSchoolRow}>
          + Add another school
        </button>

        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Institution"}
        </button>
      </form>

      {/* ============ EXISTING INSTITUTIONS ============ */}
      <div className="admin-inst-list-section">
        <h2>Existing institutions</h2>

        {loading ? (
          <p>Loading...</p>
        ) : institutions.length === 0 ? (
          <p className="admin-inst-empty">No institutions added yet.</p>
        ) : (
          <div className="admin-inst-list">
            {institutions.map((inst) => (
              <div className="admin-inst-item" key={inst._id}>
                <div className="admin-inst-item-head">
                  <span className="admin-inst-name">
                    {inst.name}
                    <span className="admin-inst-slug"> ({inst.slug})</span>
                  </span>
                  <div className="admin-inst-actions">
                    <span className={`admin-inst-status ${inst.active ? "active" : "inactive"}`}>
                      {inst.active ? "Active" : "Inactive"}
                    </span>
                    <button className="admin-inst-toggle" onClick={() => toggleActive(inst)}>
                      {inst.active ? "Deactivate" : "Activate"}
                    </button>
                    <button className="admin-inst-delete" onClick={() => handleDelete(inst)}>
                      Delete
                    </button>
                  </div>
                </div>

                {inst.schools?.length > 0 && (
                  <div className="admin-inst-schools">
                    {inst.schools.map((s) => (
                      <div key={s.name} className="admin-inst-school-tag">
                        <strong>{s.name}:</strong> {s.programmes.join(", ")}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInstitutions;
