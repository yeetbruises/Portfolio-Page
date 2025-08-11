import React, { useEffect, useRef, useImperativeHandle } from "react";

// Renders an invisible Turnstile and exposes execute() that resolves to a token
export const InvisibleTurnstile = React.forwardRef(function InvisibleTurnstile(
  { siteKey },
  ref
) {
  const mountRef = useRef(null);
  const widgetIdRef = useRef(null);
  const pending = useRef(null); // { resolve, reject }

  useEffect(() => {
    const mount = () => {
      if (!window.turnstile || !mountRef.current) return void setTimeout(mount, 50);
      widgetIdRef.current = window.turnstile.render(mountRef.current, {
        sitekey: siteKey,
        size: "invisible",
        callback: (token) => {
          if (pending.current) { pending.current.resolve(token); pending.current = null; }
        },
        "error-callback": () => {
          if (pending.current) { pending.current.reject(new Error("Turnstile error")); pending.current = null; }
        },
        "expired-callback": () => { /* allow re-exec */ },
      });
    };
    mount();
    return () => {
      if (window.turnstile && widgetIdRef.current) {
        try { window.turnstile.remove(widgetIdRef.current); } catch {}
      }
    };
  }, [siteKey]);

  useImperativeHandle(ref, () => ({
    async execute() {
      if (!window.turnstile || !widgetIdRef.current) throw new Error("Turnstile not ready");
      const p = new Promise((resolve, reject) => { pending.current = { resolve, reject }; });
      window.turnstile.execute(widgetIdRef.current);
      const token = await p;
      try { window.turnstile.reset(widgetIdRef.current); } catch {}
      return token;
    }
  }), []);

  return <div ref={mountRef} style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} />;
});
