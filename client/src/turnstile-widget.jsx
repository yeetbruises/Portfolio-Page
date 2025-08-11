// TurnstileForm.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Props:
 * - siteKey (string)          // Turnstile site key from Cloudflare
 * - apiBase (string)          // e.g.
 * - path (string)             // e.g. "/start" (Worker maps /start -> /api/start)
 * - method (string)           // "POST" (default) or "PUT"/"PATCH"
 * - onSuccess(data)           // optional
 * - onError(err)              // optional
 */
export default function TurnstileForm({
  siteKey,
  apiBase = "https://api.coastalvinny.dev",
  path = "/start",
  method = "POST",
  onSuccess,
  onError,
}) {
  const widgetContainerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load Turnstile script once
  useEffect(() => {
    const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    const alreadyLoaded = typeof window !== "undefined" && window.turnstile;
    if (alreadyLoaded) return;

    let script = document.querySelector(`script[src="${SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  // Render the widget once the script is ready
  useEffect(() => {
    let cancelled = false;
    const tryRender = () => {
      if (!window.turnstile || !widgetContainerRef.current || cancelled) {
        // Retry shortly until the script is ready
        setTimeout(tryRender, 50);
        return;
      }
      // Render and capture widgetId to reset/remove later
      widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
        sitekey: siteKey,
        "callback": (tok) => setToken(tok || ""),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
        // size: "flexible", // uncomment if you want responsive sizing
      });
    };
    tryRender();

    return () => {
      cancelled = true;
      if (window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
      }
    };
  }, [siteKey]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (!token) {
        setError("Please complete the Turnstile check.");
        return;
      }
      setSubmitting(true);

      const res = await fetch(
        `${apiBase}${path.startsWith("/") ? path : `/${path}`}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ "cf-turnstile-response": token }),
        }
      );

      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        const err = typeof data === "string" ? new Error(data) : new Error(JSON.stringify(data));
        throw err;
      }

      onSuccess?.(data);
    } catch (err) {
      setError(err.message || "Request failed");
      onError?.(err);
    } finally {
      setSubmitting(false);
      // IMPORTANT: reset to get a fresh single-use token
      if (window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch {}
      }
      setToken("");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <div ref={widgetContainerRef} className="cf-turnstile" id="ts-widget" />


      <button type="submit" disabled={submitting || !token}>
        {submitting ? "Submitting..." : "Run demo"}
      </button>

      {!!error && <div style={{ color: "crimson", fontSize: 14 }}>{error}</div>}
    </form>
  );
}
