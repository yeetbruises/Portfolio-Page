// GeoDemoButton.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

// ---- CONFIG: your Worker-backed API subdomain ----
const API_BASE = "https://api.coastalvinny.dev";

// --- Load Turnstile script once globally (safe to call multiple times) ---
function useTurnstileScript() {
  useEffect(() => {
    const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    if (typeof window !== "undefined" && window.turnstile) return;
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SRC; s.async = true; s.defer = true;
      document.head.appendChild(s);
    }
  }, []);
}

// --- Minimal fetch helper; can include Turnstile token once via widgetId ---
async function fetchJSON(path, body, { method = "POST", widgetId = null } = {}) {
  const url = `${path.startsWith("/") ? path : `/${path}`}`;
  let payload = body ?? {};

  if (widgetId && window.turnstile) {
    // widgetId may be the id string or the numeric id returned by render()
    let arg = widgetId;
    if (typeof arg === "string") arg = document.getElementById(arg) || arg;
    const token = window.turnstile.getResponse(arg);
    if (!token) throw new Error("Please complete the Turnstile check.");
    payload = { ...payload, "cf-turnstile-response": token };
  }

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: method === "GET" || method === "HEAD" ? undefined : JSON.stringify(payload),
  });

  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json() : await res.text();
  if (!res.ok) throw new Error(typeof data === "string" ? data : JSON.stringify(data));
  return data;
}

// --- Small Turnstile mount that returns widgetId when ready ---
function TurnstileGate({ siteKey, onVerified }) {
  useTurnstileScript();
  const mountRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mount = () => {
      if (!window.turnstile || !mountRef.current) return void setTimeout(mount, 50);
      widgetIdRef.current = window.turnstile.render(mountRef.current, {
        sitekey: siteKey,
        callback: () => {}, // token becomes available
        "expired-callback": () => {},
        "error-callback": () => {},
      });
    };
    mount();
    return () => {
      if (window.turnstile && widgetIdRef.current) {
        try { window.turnstile.remove(widgetIdRef.current); } catch {}
      }
    };
  }, [siteKey]);

  const begin = async () => {
    try {
      setLoading(true);
      setErr("");
      // call /start ONCE with token
      const data = await fetchJSON("/start", {}, { method: "POST", widgetId: widgetIdRef.current });
      // reset widget so token can’t be reused
      if (window.turnstile && widgetIdRef.current) window.turnstile.reset(widgetIdRef.current);
      onVerified?.(data); // pass back session payload from /start
    } catch (e) {
      setErr(e.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: 10, placeItems: "center" }}>
      <div ref={mountRef} className="cf-turnstile" id="ts-widget" />
      <button onClick={begin} disabled={loading}>
        {loading ? "Verifying..." : "Continue"}
      </button>
      {err && <div style={{ color: "crimson", fontSize: 13 }}>{err}</div>}
    </div>
  );
}

export default function GeoDemoButton({
  label = "🎮 Try the Demo!",
  siteKey = "0x4AAAAAABqY_gwKPS6vDh26",
}) {
  const [stage, setStage] = useState("idle"); // 'idle' | 'gate' | 'open'
  const [initialSession, setInitialSession] = useState(null);

  return (
    <>
      {stage === "idle" && (
        <button
          className="send-button"
          style={{ borderRadius: 10, margin: "auto", padding: "6px 12px" }}
          onClick={() => setStage("gate")}
        >
          {label}
        </button>
      )}

      {stage === "gate" && (
        <div style={{ marginTop: 10 }}>
          <TurnstileGate
            siteKey={siteKey}
            onVerified={(data) => {
              setInitialSession(data);
              setStage("open");
            }}
          />
        </div>
      )}

      {stage === "open" && (
        <GeoModal
          initialSession={initialSession}
          onClose={() => {
            setStage("idle");
            setInitialSession(null);
          }}
        />
      )}
    </>
  );
}

// ===================== Demo Modal (your original UI, intact) =====================
function GeoModal({ onClose, initialSession = null }) {
  const [session, setSession] = useState(initialSession);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const cardRef = useRef(null);

  // Resolve image base from API host (images served by your API subdomain)
  const { imageBase } = useMemo(() => {
    const u = new URL(API_BASE);
    return { imageBase: u.origin };
  }, []);

  // styles once (kept exactly as you provided)
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

  // focus mgmt + escape to close
  useEffect(() => {
    const prev = document.activeElement;
    cardRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev && prev.focus?.();
    };
  }, [onClose]);

  const bust = (u) => `${u}${u.includes("?") ? "&" : "?"}t=${Date.now()}`;
  const toImg = (path) => (path?.startsWith("http") ? path : `${imageBase}${path || ""}`);

  // ====== Your requested functions (kept as-is, with minor safety tweaks) ======
  async function startGame() {
    setBusy(true);
    setResult(null);
    setError("");
    try {
      // Subsequent /start calls: no Turnstile (already authorized)
      const data = await fetchJSON(`/start`);
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
      const data = await fetchJSON(`/action`, { sessionId: session.sessionId, action });
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
      const res = await fetchJSON(`/guess`, {
        sessionId: session.sessionId,
        pick: pickIndex,
        userId: "guest",
      });
      setResult(res);
      setTimeout(() => startGame(), 1400); // restart round
    } catch (e) {
      setError(`Guess failed: ${e.message}`);
    } finally {
      setBusy(false);
    }
  }

  // ===================== UI (markup, intact) =====================
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
