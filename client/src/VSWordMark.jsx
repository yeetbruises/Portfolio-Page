export default function VSWordMark({
    size = 54,
    strokePx,
    strokeRatio = 0.02,   // ~2% of font size (thin)
    strokeColor = "#000",
    solidColor = "#fff",   // VINEET
    fillColor = "#fff",    // SARAF fill
    className = ""
  }) {
    const stroke = strokePx ?? Math.max(1, Math.round(size * strokeRatio));
    return (
      <div className={`vs-wordmark ${className}`} style={{ fontSize: size }}>
        <link
          href="https://fonts.googleapis.com/css2?family=Anton:wght@400&display=swap"
          rel="stylesheet"
        />
        <span className="solid">VINEET</span>
        <span
          className="outlined"
        >
          SARAF
        </span>
  
        <style>{`
          .vs-wordmark {
            display:inline-flex; flex-direction:column; line-height:.9;
            font-family:"Anton", Impact, "Arial Black", sans-serif;
            letter-spacing:2px;
          }
          .vs-wordmark .solid { color: ${solidColor}; }
          .vs-wordmark .outlined { color: ${fillColor}; }
  
          /* Firefox fallback (approx outline) */
          @supports not (-webkit-text-stroke: 1px black) {
            .vs-wordmark .outlined {
              text-shadow:
                1px 0 0 ${strokeColor}, -1px 0 0 ${strokeColor},
                0 1px 0 ${strokeColor}, 0 -1px 0 ${strokeColor},
                1px 1px 0 ${strokeColor}, -1px 1px 0 ${strokeColor},
                1px -1px 0 ${strokeColor}, -1px -1px 0 ${strokeColor};
            }
          }
        `}</style>
      </div>
    );
  }
  