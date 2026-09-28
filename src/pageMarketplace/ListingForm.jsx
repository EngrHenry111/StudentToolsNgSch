import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMyListingById, createListing, updateListing } from "../apiMarketplace/publisherApi";
import Loader from "../componentsQuiz/Loader";
import "../pageQuiz/proquiz.css";
import "./marketplace.css";

// One form, two modes — used for both /publisher/listings/new and
// /publisher/listings/:id/edit, same pattern as this app already uses
// elsewhere for admin create/edit pairs.
const ListingForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [field, setField] = useState("");
  const [keywords, setKeywords] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("draft");
  const [coverImage, setCoverImage] = useState(null);
  const [existingCoverUrl, setExistingCoverUrl] = useState(null);

  useEffect(() => {
    if (!isEdit) return;

    getMyListingById(id)
      .then((listing) => {
        setTitle(listing.title);
        setField(listing.field);
        setKeywords((listing.keywords || []).join(", "));
        setPreviewContent(listing.previewContent);
        setFullContent(listing.fullContent);
        setPrice(String(listing.price / 100));
        setStatus(listing.status);
        setExistingCoverUrl(listing.coverImageUrl);
      })
      .catch(() => setError("Could not load this listing."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !field.trim() || !previewContent.trim() || !fullContent.trim() || !price) {
      setError("Title, field, price, preview content and full content are all required.");
      return;
    }

    const priceKobo = Math.round(Number(price) * 100);
    if (!Number.isFinite(priceKobo) || priceKobo <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("field", field.trim());
    formData.append("keywords", keywords);
    formData.append("previewContent", previewContent);
    formData.append("fullContent", fullContent);
    formData.append("price", priceKobo);
    formData.append("status", status);
    if (coverImage) formData.append("coverImage", coverImage);

    setSubmitting(true);
    try {
      if (isEdit) {
        await updateListing(id, formData);
      } else {
        await createListing(formData);
      }
      navigate("/publisher/listings");
    } catch (err) {
      setError(err.message || "Could not save this listing. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader fullPage label="Loading listing..." />;
  }

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h1>{isEdit ? "Edit Listing" : "New Listing"}</h1>

          {error && <div className="pq-error-box">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="pq-field">
              <label>Title</label>
              <input className="pq-input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="pq-field-row">
              <div className="pq-field">
                <label>Field / Discipline</label>
                <input
                  className="pq-input"
                  placeholder="e.g. Computer Science"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                />
              </div>

              <div className="pq-field">
                <label>Price (₦)</label>
                <input
                  className="pq-input"
                  type="number"
                  min="0"
                  step="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="pq-field">
              <label>Keywords (comma-separated)</label>
              <input
                className="pq-input"
                placeholder="e.g. machine learning, neural networks, AI"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            <div className="pq-field">
              <label>Cover Image {existingCoverUrl && "(leave blank to keep the current one)"}</label>
              {existingCoverUrl && (
                <img src={existingCoverUrl} alt="Current cover" className="mkt-listing-cover" style={{ maxWidth: 200, marginBottom: 8 }} />
              )}
              <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
            </div>

            <div className="pq-field">
              <label>Preview Content (Chapters 1 &amp; 2 — free to everyone)</label>
              <textarea
                className="pq-input"
                rows={8}
                value={previewContent}
                onChange={(e) => setPreviewContent(e.target.value)}
              />
            </div>

            <div className="pq-field">
              <label>Full Content (only unlocked to buyers)</label>
              <textarea
                className="pq-input"
                rows={12}
                value={fullContent}
                onChange={(e) => setFullContent(e.target.value)}
              />
            </div>

            <div className="pq-field">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="draft">Draft (not visible to buyers)</option>
                <option value="published">Published (live on your storefront)</option>
              </select>
            </div>

            <button type="submit" className="pq-btn pq-btn-primary pq-btn-block" disabled={submitting}>
              {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create Listing"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;
