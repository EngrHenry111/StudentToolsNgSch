import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyListings, deleteListing, updateListing } from "../apiMarketplace/publisherApi";
import Loader from "../componentsQuiz/Loader";
import "../pageQuiz/proquiz.css";
import "./marketplace.css";

const ListingManager = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Deliberately doesn't set `loading` back to true on a refetch (used
  // after publish/unpublish/delete) — the list stays visible while it
  // silently refreshes. `loading` only ever governs the initial mount,
  // and is only ever set from inside a .then/.finally callback, never
  // synchronously in the effect body itself.
  const load = () => getMyListings().then(setListings);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const togglePublish = async (listing) => {
    const nextStatus = listing.status === "published" ? "draft" : "published";
    const formData = new FormData();
    formData.append("status", nextStatus);
    await updateListing(listing._id, formData);
    load();
  };

  const handleDelete = async (listing) => {
    if (!window.confirm(`Delete "${listing.title}"? This can't be undone.`)) return;
    await deleteListing(listing._id);
    load();
  };

  if (loading) {
    return <Loader fullPage label="Loading your listings..." />;
  }

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ margin: 0 }}>Your Listings</h1>
              <p className="pq-subtitle" style={{ marginBottom: 0 }}>
                Create, edit, publish or unpublish the documents you sell.
              </p>
            </div>
            <Link to="/publisher/listings/new" className="pq-btn pq-btn-primary">
              + New Listing
            </Link>
          </div>

          {listings.length === 0 ? (
            <p style={{ color: "#94a3b8", marginTop: 20 }}>
              You haven't created any listings yet.
            </p>
          ) : (
            <div className="mkt-listing-grid">
              {listings.map((listing) => (
                <div key={listing._id} className="mkt-listing-card">
                  {listing.coverImageUrl && (
                    <img src={listing.coverImageUrl} alt={listing.title} className="mkt-listing-cover" />
                  )}
                  <div className="mkt-listing-body">
                    <span className={`mkt-status-pill ${listing.status}`}>{listing.status}</span>
                    <span className="mkt-listing-title">{listing.title}</span>
                    <span className="mkt-listing-field">{listing.field}</span>
                    <span className="mkt-listing-price">₦{(listing.price / 100).toLocaleString()}</span>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{listing.salesCount} sold</span>

                    <div className="mkt-listing-actions">
                      <Link to={`/publisher/listings/${listing._id}/edit`}>Edit</Link>
                      <button onClick={() => togglePublish(listing)}>
                        {listing.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                      <button className="mkt-danger" onClick={() => handleDelete(listing)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingManager;
