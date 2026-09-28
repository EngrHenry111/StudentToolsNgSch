import { Link } from "react-router-dom";
import Stars from "./Stars";
import "./listingCard.css";

// One document card, shared by the Research Library, publisher
// storefronts and the "related" sections on listing pages. `listing`
// comes from the server's CARD_FIELDS select; `publisher` is populated
// everywhere except the storefront, which passes its own slug instead.
const ListingCard = ({ listing, publisherSlug }) => {
  const pubSlug = listing.publisher?.slug || publisherSlug;

  return (
    <Link to={`/publishers/${pubSlug}/${listing.slug}`} className="storefront-card">
      <div className="storefront-card-image">
        {listing.coverImageUrl ? (
          <img src={listing.coverImageUrl} alt={listing.title} loading="lazy" />
        ) : (
          <div className="storefront-card-gradient">
            <h3>{listing.title}</h3>
          </div>
        )}
      </div>

      <div className="storefront-card-content">
        <h3>{listing.title}</h3>
        <span className="storefront-card-field">{listing.field}</span>
        {listing.publisher?.businessName && (
          <span className="storefront-card-publisher">by {listing.publisher.businessName}</span>
        )}
        {listing.ratingCount > 0 && <Stars value={listing.ratingAverage} count={listing.ratingCount} size={13} />}
        <span className="storefront-card-price">₦{(listing.price / 100).toLocaleString()}</span>
      </div>
    </Link>
  );
};

export const ListingGrid = ({ listings, publisherSlug }) => (
  <div className="storefront-grid">
    {listings.map((l) => (
      <ListingCard key={l._id} listing={l} publisherSlug={publisherSlug} />
    ))}
  </div>
);

export default ListingCard;
