import React, { useEffect, useState } from "react";

const DEFAULT_ALLOWED = [
  "coastalvinny.dev",
  "www.coastalvinny.dev",
  "vineetsaraf.com",
  "www.vineetsaraf.com",
];

export default function TrustedDomains({ allowed = DEFAULT_ALLOWED }) {
  const [host, setHost] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setHost(window.location.hostname);
  }, []);

  const isOfficial = allowed.includes(host);

  if (!visible) return null;

  return (
    <section
      className="trusted-domains"
      aria-label="Official domains for this website"
      style={{
        marginTop: "2rem",
        padding: "1rem 1.25rem",
        borderRadius: "12px",
        border: "1px solid rgba(0,255,0,0.25)",
        background:
          "linear-gradient(rgba(0, 255, 0, 0.15), rgba(0, 0, 0, 0.29))",
        boxShadow: "rgb(47 125 15 / 50%) 0px 0px 10px 1px"
      }}
    >
      <button
        onClick={() => setVisible(false)}
        aria-label="Close trusted domains box"
        style={{ position: "relative", background: "transparent", border: "none", fontSize: "1.2rem", color: "#aaa", cursor: "pointer", float: "right" }}>
        ✖
      </button>

      <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
        <span
          role="img"
          aria-label={isOfficial ? "Verified" : "Warning"}
          style={{ fontSize: "1.25rem" }}
        >
          {isOfficial ? "✅" : "⚠️"}
        </span>
        <strong style={{ fontSize: "1rem" }}>
          {isOfficial
            ? "You’re on an official domain."
            : "This may not be an official domain."}
        </strong>
      </div>

      <p style={{ margin: ".5rem 0 0", fontSize: ".9rem", opacity: 0.9 }}>
        Official domains for this site:
      </p>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: ".75rem 1.25rem",
          margin: ".5rem 0 0",
          padding: 0,
          listStyle: "none",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
          fontSize: ".9rem",
        }}
      >
        {allowed.map((d) => (
          <li key={d}>
            <a
              href={`https://${d}`}
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              {d}
            </a>
            {host === d && (
              <span style={{ marginLeft: ".4rem", opacity: 0.7 }}>(current)</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
