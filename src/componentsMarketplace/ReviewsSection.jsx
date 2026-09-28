import { useState } from "react";
import { submitReview } from "../apiMarketplace/marketplaceApi";
import Stars from "./Stars";
import "./reviewsSection.css";

// Reviews on a listing page. Anyone can read them; only a buyer (listing
// .owned) gets the form — the server enforces the same rule. A buyer's
// second submission edits their existing review.
const ReviewsSection = ({ listing, onChange }) => {
  const mine = listing.reviews?.find((r) => r.mine);

  const [rating, setRating] = useState(mine?.rating || 0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState(mine?.comment || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!rating) {
      setError("Please choose a star rating.");
      return;
    }

    setSaving(true);
    try {
      await submitReview(listing._id, { rating, comment: comment.trim() });
      setMessage(mine ? "Your review was updated." : "Thanks — your review is posted.");
      onChange?.();
    } catch (err) {
      setError(err.message || "Could not save your review.");
    } finally {
      setSaving(false);
    }
  };

  const reviews = listing.reviews || [];

  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading">
        Reviews{" "}
        {listing.ratingCount > 0 && <Stars value={listing.ratingAverage} count={listing.ratingCount} size={15} />}
      </h2>

      {listing.owned && (
        <form className="review-form" onSubmit={handleSubmit}>
          <p className="review-form-title">{mine ? "Edit your review" : "Rate this document"}</p>

          <div className="review-star-picker" role="radiogroup" aria-label="Your rating" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} star${n === 1 ? "" : "s"}`}
                className={`review-star${(hover || rating) >= n ? " on" : ""}`}
                onMouseEnter={() => setHover(n)}
                onClick={() => setRating(n)}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={1000}
            rows={3}
            placeholder="What was useful? (optional)"
          />

          {error && <div className="listing-error">{error}</div>}
          {message && <div className="review-saved">{message}</div>}

          <button type="submit" className="review-submit" disabled={saving}>
            {saving ? "Saving…" : mine ? "Update review" : "Post review"}
          </button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="reviews-empty">
          No reviews yet.{listing.owned ? " Be the first to rate it." : " Buyers can rate this document after unlocking it."}
        </p>
      ) : (
        <ul className="reviews-list">
          {reviews.map((r) => (
            <li key={r._id} className="review-item">
              <div className="review-head">
                <Stars value={r.rating} size={13} />
                <strong>{r.username}</strong>
                {r.mine && <span className="review-you">You</span>}
                <span className="review-date">{new Date(r.updatedAt).toLocaleDateString()}</span>
              </div>
              {r.comment && <p className="review-comment">{r.comment}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ReviewsSection;
