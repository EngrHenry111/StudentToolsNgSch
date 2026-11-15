// 754 → "12:34"; long=true → "1h 5m" for totals.
export const formatDuration = (seconds, long = false) => {
  const s = Math.round(seconds || 0);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (long) return h ? `${h}h ${m}m` : `${m}m`;
  const sec = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
};
