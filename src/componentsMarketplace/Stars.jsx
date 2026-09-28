// Read-only star display, e.g. ★★★★☆ 4.2 (12). Rounds to the nearest
// whole star — half-stars aren't worth the extra markup at this size.
const Stars = ({ value = 0, count, size = 14 }) => {
  const rounded = Math.round(value);

  return (
    <span
      className="stars"
      style={{ fontSize: size, whiteSpace: "nowrap" }}
      aria-label={`Rated ${value} out of 5${count != null ? ` from ${count} review${count === 1 ? "" : "s"}` : ""}`}
    >
      <span aria-hidden="true" style={{ color: "#fbbf24", letterSpacing: 1 }}>
        {"★".repeat(rounded)}
        <span style={{ color: "rgba(148,163,184,0.45)" }}>{"★".repeat(5 - rounded)}</span>
      </span>
      {count != null && (
        <span aria-hidden="true" style={{ marginLeft: 6, color: "var(--muted, #94a3b8)", fontSize: size - 2 }}>
          {value ? value.toFixed(1) : "0"} ({count})
        </span>
      )}
    </span>
  );
};

export default Stars;
