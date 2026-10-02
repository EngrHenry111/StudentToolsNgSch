// Vercel Edge Middleware — serve pre-rendered HTML to crawlers via Prerender.io.
//
// Real users get the normal SPA untouched. Only known bots (Google, Bing,
// social/link unfurlers, LLM crawlers) are routed through Prerender.io, which
// returns a fully-rendered snapshot of the page (with the correct <title>,
// meta, canonical and JSON-LD that react-helmet-async writes at runtime).
//
// Requires the env var  PRERENDER_TOKEN  (Vercel → Project → Settings →
// Environment Variables). Get the token from the Prerender.io dashboard.
// If the token is missing or Prerender.io errors, this fails open — the
// crawler just gets the normal SPA, exactly as before.
//
// Every response carries an `x-prerender-mw` header describing what the
// middleware decided, so you can debug with:  curl -sI -A Googlebot <url>

import { next } from "@vercel/edge";

export const config = {
  matcher: "/:path*"
};

const PRERENDER_SERVICE = "https://service.prerender.io";

// Bots we route through Prerender.io.
// NOTE: Prerender.io's OWN rendering crawler (UA contains "prerender") must
// NOT be matched here, or we'd proxy its request straight back to Prerender
// and loop. It falls through to the SPA, which is exactly what it wants to
// render.
const BOT_UA =
  /(googlebot|google-inspectiontool|bingbot|yandex|duckduckbot|baiduspider|slurp|sogou|exabot|facebookexternalhit|facebot|twitterbot|slackbot|slack-imgproxy|linkedinbot|embedly|pinterest|redditbot|whatsapp|telegrambot|discordbot|skypeuripreview|applebot|petalbot|bytespider|ahrefsbot|semrushbot|rogerbot|screaming\s?frog|gptbot|oai-searchbot|chatgpt-user|perplexitybot|claudebot|anthropic-ai|claude-web|ccbot|google-extended|cohere-ai|amazonbot|bitlybot|w3c_validator)/i;

const SKIP_EXT =
  /\.(js|mjs|cjs|css|json|xml|txt|map|png|jpe?g|gif|svg|webp|avif|ico|bmp|woff2?|ttf|otf|eot|mp[34]|webm|ogg|wav|pdf|zip|gz|wasm|webmanifest)$/i;

const SKIP_PATH =
  /^\/(api|assets|admin|pro|login|register|forgot-password|reset-password)(\/|$)/i;

const tag = (response, value) => {
  response.headers.set("x-prerender-mw", value);
  return response;
};

export default async function middleware(request) {
  const token = process.env.PRERENDER_TOKEN;
  const url = new URL(request.url);
  const ua = request.headers.get("user-agent") || "";

  if (!token) return tag(next(), "skip:no-token");
  if (request.method !== "GET") return tag(next(), "skip:method");
  if (SKIP_EXT.test(url.pathname)) return tag(next(), "skip:asset");
  if (SKIP_PATH.test(url.pathname)) return tag(next(), "skip:path");
  if (request.headers.has("x-prerender")) return tag(next(), "skip:loop");
  if (!BOT_UA.test(ua)) return tag(next(), "skip:not-bot");

  const target = `${PRERENDER_SERVICE}/${url.protocol}//${url.host}${url.pathname}${url.search}`;

  try {
    const upstream = await fetch(target, {
      headers: {
        "X-Prerender-Token": token,
        "X-Prerender-Int-Type": "vercel-edge",
        "x-prerender": "1",
        "User-Agent": ua
      },
      signal: AbortSignal.timeout(20000),
      // Pages set <meta name="prerender-status-code" content="301"> plus a
      // prerender-header Location for moved tutorials — don't follow it,
      // hand the crawler the real 301.
      redirect: "manual"
    });

    // Real redirects (moved/merged tutorials) go to the crawler as-is.
    if ([301, 302, 307, 308].includes(upstream.status)) {
      const location = upstream.headers.get("location");
      if (location) {
        return new Response(null, {
          status: upstream.status,
          headers: { location, "x-prerender-mw": `redirect-${upstream.status}` }
        });
      }
    }

    // 404 / 410 must reach Google as real status codes; falling back to the
    // SPA here would serve a 200 and cause "soft 404" reports.
    const isNotFound = upstream.status === 404 || upstream.status === 410;

    if (!upstream.ok && !isNotFound) return tag(next(), `fallback:upstream-${upstream.status}`);

    // Forward Prerender's response (headers included, so the dashboard's
    // integration check can see its own fingerprint), overriding only the
    // bits we care about.
    const headers = new Headers(upstream.headers);
    headers.set("content-type", "text/html; charset=utf-8");
    headers.delete("content-encoding");
    headers.delete("content-length");
    headers.set(
      "cache-control",
      "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800"
    );
    headers.set("x-prerender-mw", isNotFound ? `hit-${upstream.status}` : "hit");

    const html = await upstream.text();
    return new Response(html, { status: upstream.status, headers });
  } catch (err) {
    return tag(next(), `fallback:${err?.name || "error"}`);
  }
}
