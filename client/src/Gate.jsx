import { useEffect, useState } from "react";

const GATE = "https://gate.coastalvinny.dev";
const ON_FAIL = "https://www.linkedin.com/in/vineet-saraf/";

export default function Gate({ children }) {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    (async () => {
      const url = new URL(window.location.href);
      const token = url.searchParams.get("access");

      if (!token) {
        const next = encodeURIComponent(url.toString());
        window.location.replace(`${GATE}/ticket?next=${next}`);
        return;
      }

      try {
        const host = window.location.host;
        const r = await fetch(`${GATE}/verify?access=${encodeURIComponent(token)}&host=${encodeURIComponent(host)}`, {
          method: "GET",
          cache: "no-store",
          credentials: "omit",
        });

        if (r.status === 204) {
          // Clean the URL
          url.searchParams.delete("access");
          window.history.replaceState({}, "", url.toString());
          setOk(true);
        } else {
          window.location.replace(ON_FAIL);
        }
      } catch {
        window.location.replace(ON_FAIL);
      }
    })();
  }, []);

  if (ok === null) return null; 
  return children;
}
