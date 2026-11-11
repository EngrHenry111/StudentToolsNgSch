import { useState } from "react";
import "./shareButtons.css";

// WhatsApp first — that's where Nigerian students actually pass links
// around. On phones that support it, "Share" opens the native share sheet
// (Instagram, SMS…); everywhere else the fixed buttons cover it.
//
// `text` replaces the default message, e.g. a calculator sharing the
// student's result ("I just calculated my CGPA: 4.21 …"). The link is
// always the page itself, so whoever opens it can try the tool too.
//
// `card` ({ label, value, sub }) adds a "Share as image" button that draws a
// result card for WhatsApp Status (see resultCard.js). Pass it only once
// there is a result to show.
const ShareButtons = ({ url, title, text, label = "Share:", card }) => {
  const [copied, setCopied] = useState(false);
  const [cardState, setCardState] = useState("");

  const shareCard = async () => {
    setCardState("working");
    try {
      // Loaded on demand so pages without a result don't pay for it.
      const { shareResultCard } = await import("./resultCard");
      const path = new URL(url).pathname;
      const slug = path.split("/").filter(Boolean).pop() || "result";
      const outcome = await shareResultCard({ ...card, path }, `my-${slug}-result.png`);
      setCardState(outcome === "downloaded" ? "saved" : "");
      if (outcome === "downloaded") setTimeout(() => setCardState(""), 3000);
    } catch {
      setCardState("");
    }
  };
  const message = text || `${title} — on StudentToolsNG`;
  const enc = encodeURIComponent;

  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text ? `${message}\n${url}` : url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const nativeShare = () => {
    navigator.share({ title, text: message, url }).catch(() => { /* user cancelled */ });
  };

  return (
    <div className="share-buttons" aria-label="Share">
      <span className="share-label">{label}</span>
      {card && (
        <button type="button" className="share-btn share-card" onClick={shareCard} disabled={cardState === "working"}>
          {cardState === "working" ? "Preparing…" : cardState === "saved" ? "Image saved ✓" : "📷 Share as image"}
        </button>
      )}
      <a
        className="share-btn share-whatsapp"
        href={`https://wa.me/?text=${enc(`${message}\n${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
      <a
        className="share-btn"
        href={`https://t.me/share/url?url=${enc(url)}&text=${enc(message)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Telegram
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
        href={`https://twitter.com/intent/tweet?text=${enc(message)}&url=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <button type="button" className="share-btn" onClick={copy}>
        {copied ? "Copied ✓" : text ? "Copy" : "Copy link"}
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
