import { useState } from "react";
import "./shareButtons.css";

// WhatsApp first — that's where Nigerian students actually pass links
// around. On phones that support it, "Share" opens the native share sheet
// (Telegram, Instagram, SMS…); everywhere else the fixed buttons cover it.
const ShareButtons = ({ url, title }) => {
  const [copied, setCopied] = useState(false);
  const text = `${title} — on StudentToolsNG`;
  const enc = encodeURIComponent;

  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const nativeShare = () => {
    navigator.share({ title, text, url }).catch(() => { /* user cancelled */ });
  };

  return (
    <div className="share-buttons" aria-label="Share">
      <span className="share-label">Share:</span>
      <a
        className="share-btn share-whatsapp"
        href={`https://wa.me/?text=${enc(`${text}\n${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
      <a
        className="share-btn"
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </a>
      <a
        className="share-btn"
        href={`https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <button type="button" className="share-btn" onClick={copy}>
        {copied ? "Copied ✓" : "Copy link"}
      </button>
      {canNativeShare && (
        <button type="button" className="share-btn" onClick={nativeShare}>
          More…
        </button>
      )}
    </div>
  );
};

export default ShareButtons;
