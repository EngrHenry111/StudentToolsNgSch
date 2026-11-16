import { useState } from "react";

const SITE = "https://studenttoolsng.com";

const BADGE = {
  draft: ["", "Draft"],
  open: ["ok", "Open"],
  paused: ["warn", "Paused"],
  closed: ["bad", "Closed"]
};

export function StatusBadge({ status }) {
  const [cls, label] = BADGE[status] || BADGE.draft;
  return <span className={`adm-badge ${cls}`}>{label}</span>;
}

// The shareable public link with a one-tap copy button.
export function CopyLink({ slug, compact = false }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE}/programs/${slug}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Older browsers / no permission: select-and-copy fallback.
      const t = document.createElement("textarea");
      t.value = url;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className={`prog-copy ${compact ? "compact" : ""}`}>
      <a href={url} target="_blank" rel="noreferrer">{url.replace("https://", "")}</a>
      <button type="button" className="course-btn secondary" onClick={copy}>{copied ? "Copied ✓" : "Copy link"}</button>
    </span>
  );
}
