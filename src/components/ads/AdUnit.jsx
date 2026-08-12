import { useEffect, useRef } from "react";
import "./adUnit.css";

// Reads your AdSense publisher ID from an env var so it's never hardcoded
// and so ads simply don't render at all until you've set it up — this
// avoids accidentally sending "invalid" ad requests before your AdSense
// account is approved, which AdSense flags negatively.
const CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID;
const ADS_ENABLED = import.meta.env.VITE_ADSENSE_ENABLED === "true";

/**
 * <AdUnit slot="1234567890" format="auto" />
 *
 * slot   - the ad unit "slot" ID you create in your AdSense dashboard
 *          (AdSense > Ads > By ad unit > create a "Display ad").
 * format - "auto" (responsive, recommended) or a fixed size like
 *          "rectangle" / "horizontal".
 * label  - optional small "Advertisement" label shown above the unit
 *          (good practice for transparency, not required by Google).
 */
const AdUnit = ({ slot, format = "auto", label = true, style }) => {
  const insRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADS_ENABLED || !CLIENT_ID || !slot) return;

    // Guard against double-push on the same <ins> — happens easily in
    // React (StrictMode double-invoke in dev, or fast route re-renders)
    // and throws "adsbygoogle.push() error" if you push the same node twice.
    if (pushed.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (err) {
      console.error("AdSense push failed:", err);
    }
  }, [slot]);

  // Don't render anything (not even an empty ad slot) until ads are
  // actually configured — prevents empty gaps in layout during setup.
  if (!ADS_ENABLED || !CLIENT_ID || !slot) return null;

  return (
    <div className="ad-unit-wrapper" style={style}>
      {label && <span className="ad-unit-label">Advertisement</span>}
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdUnit;
