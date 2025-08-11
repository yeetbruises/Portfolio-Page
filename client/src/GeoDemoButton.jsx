// GeoDemoButton.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TurnstileForm } from "./turnstile-widget.jsx";

export default function GeoDemoButton({ label = "🎮 Try the Demo!", apiPrefix = "/api" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TurnstileForm
        siteKey="0x4AAAAAABqY_gwKPS6vDh26"
        apiBase="https://api.coastalvinny.dev"
        path="/start"
        payload={{ level: 1 }}
        onSuccess={(data) => console.log("OK:", data)}
        onError={(e) => console.error(e)}
      />
      <button className="send-button" style={{borderRadius: "10px", margin: "auto", paddingUp: "5px", paddingDown: "5px", paddingLeft: "10px", paddingRight: "10px"}} onClick={() => setOpen(true)}>{label}</button>
      {open && <GeoModal apiPrefix={apiPrefix} onClose={() => setOpen(false)} />}
    </>
  );
}

function GeoModal({ apiPrefix = "/api", onClose }) {
  const [session, setSession] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const cardRef = useRef(null);

  // --- Resolve API & image bases ---
  const { apiBase, imageBase } = useMemo(() => {
    // If apiPrefix is absolute, use it as-is
    try {
      const u = new URL(apiPrefix);
      return { apiBase: u.href.replace(/\/$/, ""), imageBase: u.origin };
    } catch (_) {
      // Relative prefix: build origin; on localhost, default to port 3002
      const loc = window.location;
      const isLocal = ["localhost", "127.0.0.1"].includes(loc.hostname);
      const port = isLocal ? "3002" : (loc.port || "");
      const origin = `${loc.protocol}//${loc.hostname}${port ? `:${port}` : ""}`;
      const base = apiPrefix.startsWith("/") ? apiPrefix : `/${apiPrefix}`;
      return { apiBase: `${origin}${base}`.replace(/\/$/, ""), imageBase: origin };
    }
  }, [apiPrefix]);

  // styles once
  useEffect(() => {
    const id = "geo-demo-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = `
      .geo-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:9999}
      .geo-card{width:min(860px,92vw);background:#111827;color:#e5e7eb;border:1px solid #1f2937;border-radius:14px;box-shadow:0 10px 50px rgba(0,0,0,.4);padding:16px;position:relative}
      .geo-close{position:absolute;right:10px;top:10px;border:1px solid #374151;background:#111827;color:#9ca3af;border-radius:8px;padding:6px 10px;cursor:pointer}
      .geo-h{margin:0 0 8px 0;font:600 18px/1.2 system-ui,-apple-system,Segoe UI,Roboto}
      .geo-meta{display:flex;gap:8px;align-items:center;opacity:.85;margin:6px 0 10px}
      .geo-pill{border:1px solid #374151;border-radius:999px;padding:3px 10px;font-size:13px}
      .geo-img{width:100%;border-radius:10px;background:#0b1020;aspect-ratio:16/10;object-fit:cover}
      .geo-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
      .geo-btn{padding:10px 14px;border-radius:10px;border:1px solid #2b3750;background:#1b2230;color:#e6e6e6;cursor:pointer}
      .geo-btn[disabled]{opacity:.5;cursor:not-allowed}
      .geo-country{background:#212a39}
      .geo-res{margin-top:10px;min-height:22px}
      .geo-ok{color:#67e07d;border-color:#2e5638}
      .geo-bad{color:#ff7b7b;border-color:#5a2e2e}
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    startGame();
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const prev = document.activeElement;
    cardRef.current?.focus();
    return () => prev && prev.focus?.();
  }, []);

  // point all API calls to your Worker-backed subdomain
  const API_BASE = "https://api.coastalvinny.dev"; // <- change to your real domain

  /**
   * fetchJSON("/start", { foo: "bar" }, { method: "POST", turnstileWidgetId: "ts-widget-id" })
   * fetchJSON("/leaderboard.json", null, { method: "GET" })
   */
  async function fetchJSON(path, body, opts = { method: "POST", turnstileWidgetId: "ts-widget" }) {
    const { method = "POST", turnstileWidgetId = null } = opts;
    const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

    // build payload & (optionally) add Turnstile token
    let payload = body ?? {};
    if (turnstileWidgetId && window.turnstile) {
      const token = await turnstile.getResponse(turnstileWidgetId);
      payload = { ...payload, "cf-turnstile-response": token };
    }

    const res = await fetch(url, {
      method,
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: method === "GET" || method === "HEAD" ? undefined : JSON.stringify(payload),
    });

    const ct = res.headers.get("content-type") || "";
    const data = ct.includes("application/json") ? await res.json() : await res.text();
    if (!res.ok) throw new Error(typeof data === "string" ? data : JSON.stringify(data));
    return data;
  }


  const bust = (u) => `${u}?t=${Date.now()}`;
  const toImg = (path) => (path.startsWith("http") ? path : `${imageBase}${path}`);

  async function startGame() {
    setBusy(true);
    setResult(null);
    setError("");
    try {
      const data = await fetchJSON(`${apiBase}/start`);
      data.imageUrl = bust(toImg(data.imageUrl));
      setSession(data);
    } catch (e) {
      setError(`Failed to start: ${e.message}`);
    } finally {
      setBusy(false);
    }
  }

  async function act(action) {
    if (!session?.sessionId) return;
    setBusy(true);
    setError("");
    try {
      const data = await fetchJSON(`${apiBase}/action`, { sessionId: session.sessionId, action });
      data.imageUrl = bust(toImg(data.imageUrl));
      setSession((s) => ({ ...s, ...data }));
    } catch (e) {
      setError(`Action failed: ${e.message}`);
    } finally {
      setBusy(false);
    }
  }

  async function guess(pickIndex) {
    if (!session?.sessionId) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetchJSON(`${apiBase}/guess`, {
        sessionId: session.sessionId,
        pick: pickIndex,
        userId: "guest",
      });
      setResult(res);
      setTimeout(() => startGame(), 1400);
    } catch (e) {
      setError(`Guess failed: ${e.message}`);
    } finally {
      setBusy(false);
    }
  }

  const body = (
    <div className="geo-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="geo-card" ref={cardRef} tabIndex={-1} onClick={(e) => e.stopPropagation()} aria-label="Geo Demo">
        <button className="geo-close" onClick={onClose} title="Close">✕</button>
        <h3 className="geo-h">Geo Bot — Live Demo</h3>
        <div className="geo-meta">
          <span className="geo-pill">Moves: {session ? session.movesLeft : "—"}</span>
          <span className="geo-pill">Web Demo</span>
          {busy && <span className="geo-pill">Working…</span>}
        </div>

        <img className="geo-img" src={session?.imageUrl || ""} alt="Street View" draggable={false} />

        <div className="geo-row">
          <button className="geo-btn" disabled={busy} onClick={() => act("left")}>⬅️ Left</button>
          <button className="geo-btn" disabled={busy} onClick={() => act("right")}>➡️ Right</button>
          <button className="geo-btn" disabled={busy} onClick={() => act("zoom_in")}>🔎 Zoom In</button>
          <button className="geo-btn" disabled={busy} onClick={() => act("zoom_out")}>🔭 Zoom Out</button>
        </div>

        <div className="geo-row">
          {(session?.options || []).map((name, i) => (
            <button key={i} className="geo-btn geo-country" disabled={busy} onClick={() => guess(i)}>
              {name}
            </button>
          ))}
        </div>

        <div className="geo-res" aria-live="polite">
          {result && (
            <span className={`geo-pill ${result.result === "correct" ? "geo-ok" : "geo-bad"}`}>
              {result.result === "correct" ? "Correct!" : "Wrong :("}
            </span>
          )}
          {result && <> &nbsp; Answer: {result.revealLabel} · +{result.points} pts</>}
          {error && <div style={{ marginTop: 6 }}>{error}</div>}
        </div>
      </div>
    </div>
  );

  return createPortal(body, document.body);
}
