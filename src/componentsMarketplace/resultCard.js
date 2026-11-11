// Draws a shareable result image (1080×1350, the WhatsApp/Instagram portrait
// size) entirely in the browser, so nothing the student entered leaves the
// device. The card always carries the page address, so anyone who sees it on
// a Status knows where to calculate their own.

const W = 1080;
const H = 1350;
const FONT = '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

// Largest font size (≤ max) at which `text` fits in `width`.
function fitFont(ctx, text, weight, max, width) {
  let size = max;
  ctx.font = `${weight} ${size}px ${FONT}`;
  while (size > 24 && ctx.measureText(text).width > width) {
    size -= 4;
    ctx.font = `${weight} ${size}px ${FONT}`;
  }
  return size;
}

function centred(ctx, text, y, { weight = 400, max = 48, color = "#e2e8f0", width = W - 160 } = {}) {
  fitFont(ctx, text, weight, max, width);
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(text, W / 2, y);
}

export function drawResultCard({ label, value, sub, path }) {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0b1120");
  bg.addColorStop(1, "#1e1b4b");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Soft glows
  const glow = (x, y, r, color) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  };
  glow(180, 160, 520, "rgba(0,245,255,0.18)");
  glow(920, 1180, 560, "rgba(123,47,247,0.22)");

  // Accent bar
  const bar = ctx.createLinearGradient(0, 0, W, 0);
  bar.addColorStop(0, "#00f5ff");
  bar.addColorStop(1, "#7b2ff7");
  ctx.fillStyle = bar;
  ctx.fillRect(0, 0, W, 14);

  // Brand
  centred(ctx, "StudentToolsNG", 150, { weight: 700, max: 58, color: "#00f5ff" });

  // Result
  centred(ctx, label, 430, { weight: 500, max: 64, color: "#94a3b8" });
  centred(ctx, value, 680, { weight: 800, max: 230, color: "#ffffff" });
  if (sub) centred(ctx, sub, 820, { weight: 600, max: 66, color: "#00f5ff" });

  // Divider
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.fillRect(240, 980, W - 480, 3);

  // Call to action
  centred(ctx, "Calculate yours free at", 1090, { weight: 400, max: 48, color: "#cbd5e1" });
  centred(ctx, `studenttoolsng.com${path || ""}`, 1170, { weight: 700, max: 54, color: "#ffffff" });

  return canvas;
}

const toBlob = (canvas) => new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

// Share the card through the phone's share sheet when it supports files
// (WhatsApp, Instagram…), otherwise download it.
export async function shareResultCard(card, fileName = "my-result.png") {
  const blob = await toBlob(drawResultCard(card));
  if (!blob) return "failed";
  const file = new File([blob], fileName, { type: "image/png" });

  if (typeof navigator !== "undefined" && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text: `Calculate yours free at https://studenttoolsng.com${card.path || ""}` });
      return "shared";
    } catch (e) {
      if (e && e.name === "AbortError") return "cancelled";
      // fall through to download
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  return "downloaded";
}
