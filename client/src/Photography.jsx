import React, { useEffect, useMemo, useRef, useState } from "react";

const BRAND = "Your Name";
const HERO_URL = "/images/hero.jpg"; 

// put near your IMAGES array
const R2_ORIGIN = "https://img.coastalvinny.dev"; // your R2 custom domain

// turn "5.JPG" into "5.preview.webp"
const previewPath = (p) =>
  p.replace(/^\/+/, "").replace(/[^/]+$/, (name) => {
    const stem = name.replace(/\.[^.]+$/, "");
    return `${stem}.preview.jpg`;
  });

// build full URLs
const r2 = (key) => `${R2_ORIGIN}/${key.replace(/^\/+/, "")}`;


const IMAGES = [
  { src: "1.jpg", w: 4032, h: 3024, alt: "Dawn ridge", album: "Landscapes", exif: { desc: "", camera: "Fujifilm X-T5", lens: "23mm", iso: 160, f: "f/5.6", s: "1/500" } },
  { src: "2.jpg", w: 4032, h: 3024, alt: "Pine fog", album: "Landscapes", exif: { desc: "", camera: "Sony A7C II", lens: "55mm", iso: 200, f: "f/4", s: "1/400" } },
  { src: "3.jpg", w: 3024, h: 4032, alt: "Street rain", album: "Street", exif: { desc: "", camera: "Ricoh GR III", lens: "18mm", iso: 800, f: "f/2.8", s: "1/250" } },
  { src: "4.jpg", w: 4032, h: 3024, alt: "Coastal dusk", album: "Seascapes", exif: { desc: "", camera: "Nikon Zf", lens: "35mm", iso: 100, f: "f/8", s: "1/125" } },
  { src: "5.jpg", w: 4032, h: 3024, alt: "Mountain trail", album: "Landscapes", exif: { desc: "", camera: "Canon R6 II", lens: "24-70", iso: 100, f: "f/7.1", s: "1/320" } },
  { src: "6.jpg", w: 4032, h: 3024, alt: "Neon alley", album: "Street", exif: { desc: "", camera: "Leica Q2", lens: "28mm", iso: 1600, f: "f/1.7", s: "1/60" } },
  { src: "7.jpg", w: 3020, h: 3940, alt: "Sea stacks", album: "Seascapes", exif: { desc: "", camera: "Sony A7R V", lens: "70-200", iso: 100, f: "f/11", s: "1/6" } },
  { src: "8.jpg", w: 4032, h: 3024, alt: "City blue hour", album: "City", exif: { desc: "", camera: "Fujifilm X100V", lens: "23mm", iso: 640, f: "f/2", s: "1/200" } },
  { src: "9.jpg", w: 4032, h: 3024, alt: "Portrait window", album: "People", exif: { desc: "", camera: "Canon R5", lens: "85mm", iso: 200, f: "f/2.0", s: "1/320" } },
  { src: "10.jpg", w: 4032, h: 3024, alt: "Desert road", album: "Landscapes", exif: { desc: "", camera: "Nikon Z6 II", lens: "24-70", iso: 100, f: "f/9", s: "1/200" } },
];

const ALBUMS = [
  { id: "all", label: "All" },
  { id: "Landscapes", label: "Landscapes" },
  { id: "Seascapes", label: "Seascapes" },
  { id: "Street", label: "Street" },
  { id: "City", label: "City" },
  { id: "People", label: "People" },
];

// ADD: load Tailwind CDN only while this page is mounted
function useTailwindOnThisPage() {
    useEffect(() => {
      // remember existing styles so we can remove only what we add
      const before = new Set([...document.head.querySelectorAll('style,link[rel="stylesheet"]')]);
  
      // turn off Tailwind's global reset to avoid overriding your site CSS
      const cfg = document.createElement("script");
      cfg.text = `tailwind = { config: { corePlugins: { preflight: false } } }`;
      document.head.appendChild(cfg);
  
      // load the CDN script
      const s = document.createElement("script");
      s.src = "https://cdn.tailwindcss.com";
      s.async = true;
      document.head.appendChild(s);
  
      // cleanup on unmount (remove only the styles we added)
      return () => {
        s.remove();
        cfg.remove();
        const after = [...document.head.querySelectorAll('style,link[rel="stylesheet"]')];
        for (const el of after) if (!before.has(el)) el.remove();
        if (typeof window !== "undefined" && "tailwind" in window) delete window.tailwind;
      };
    }, []);
  }
  

function useKey(handler) {
  useEffect(() => {
    const onKey = (e) => handler(e);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler]);
}

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Nav({ onAboutClick }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={classNames(
      "fixed inset-x-0 top-0 z-40 transition backdrop-blur",
      scrolled ? "bg-black/40 border-b border-white/10" : "bg-transparent"
    )}>
      <nav style={{height: "40px"}} className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="text-white text-lg font-semibold tracking-wide">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">Vineet Saraf</h2>
            </div>
        </a>
        <div className="flex items-center gap-4">
          <a href="#portfolio" className="text-white/90 hover:text-white text-sm">Albums</a>
          <button className="text-white/90 hover:text-white text-sm" onClick={onAboutClick}>About</button>
          <a href="#contact" className="text-white/90 hover:text-white text-sm">Contact</a>
        </div>
      </nav>
    </header>
  );
}

function AlbumFilter({ active, counts, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" style={{margin: "auto", width: "fit-content"}}>
      {ALBUMS.map((a) => (

        <button
          key={a.id}
          onClick={() => onChange(a.id)}
          className={classNames(
            "rounded-full border px-3 py-1 text-sm transition-colors border-white/30 text-white hover:border-white/60 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40",
            active === a.id ? "bg-black text-white border-black" : "border-black/20 text-black hover:border-black/40"
          )}
          aria-pressed={active === a.id}
          style={{ color: "white" }}
        >
          {a.label}
          {a.id !== "all" && counts[a.id] != null && (
             <span class="ml-2 inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">4</span>
            )}
        </button>
      ))}
    </div>
  );
}

// Infinite scroller for arrays.
function useInfinite(allItems, step = 20) {
  const [limit, setLimit] = useState(step);
  const more = limit < allItems.length;
  const list = allItems.slice(0, limit);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !more) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setLimit((n) => Math.min(n + step, allItems.length));
          break;
        }
      }
    }, { rootMargin: "1200px 0px" });
    io.observe(node);
    return () => io.disconnect();
  }, [allItems.length, more, step]);

  return { list, more, sentinelRef, reset: (n = step) => setLimit(n) };
}

// Responsive gallery
function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width || 0;
      setWidth(Math.round(w));
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
}

function targetRowHeightFor(width) {
    if (width < 480) return 260; 
    if (width < 768) return 320; 
    if (width < 1024) return 420;
    if (width < 1440) return 520;      
    return 640;                         
  }

function buildJustifiedRows(items, containerWidth, gap = 12, baseRowHeight = 260, fillLastRow = false) {
  if (!containerWidth) return [];
  const rows = [];
  let cur = [];
  let arSum = 0; // sum of width/height for current row

  items.forEach((img, idx) => {
    const ar = Math.max(0.01, (img.w || 1) / (img.h || 1));
    cur.push({ ...img, idx, ar });
    arSum += ar;

    const naturalRowWidth = baseRowHeight * arSum + gap * (cur.length - 1);
    if (naturalRowWidth >= containerWidth) {
      const scale = (containerWidth - gap * (cur.length - 1)) / (baseRowHeight * arSum);
      const h = Math.max(50, Math.round(baseRowHeight * scale));
      rows.push(cur.map((it) => ({ ...it, width: Math.round(h * it.ar), height: h })));
      cur = [];
      arSum = 0;
    }
  });

  // Last row
  if (cur.length) {
    const h = fillLastRow
      ? Math.round((containerWidth - gap * (cur.length - 1)) / arSum)
      : Math.round(baseRowHeight);
    rows.push(cur.map((it) => ({ ...it, width: Math.round(h * it.ar), height: h })));
  }

  return rows;
}

function JustifiedGallery({ items, onOpen }) {
  const GAP = 6;
  const [ref, width] = useContainerWidth();
  const baseRowHeight = targetRowHeightFor(width);

  const rows = useMemo(() => buildJustifiedRows(items, width, GAP, baseRowHeight, true), [items, width, baseRowHeight]);

  return (
    <div ref={ref}>
      {rows.map((row, r) => (
        <div key={r} className="mb-3 flex" style={{ gap: GAP }}>
          {row.map((img) => (
            <figure
              key={img.src + img.idx}
              className="relative overflow-hidden rounded-none shadow hover:shadow-md transition"
              style={{ width: img.width + "px", height: img.height + "px" }}
            >
              <button onClick={() => onOpen(img.idx)} className="group block w-full h-full text-left">
              <img
                src={r2(previewPath(img.src))}
                alt={img.alt || "Photo"}
                loading="lazy"
                className="block w-full h-full object-cover"
                />
                {/* <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="text-white text-sm opacity-90 group-hover:opacity-100 transition">{img.alt || " "}</span>
                </figcaption> */}
              </button>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

function Lightbox({ items, index, onClose, onPrev, onNext }) {
    const imgRef = useRef(null);
    const [isFs, setIsFs] = useState(false);
  
    const isFullscreen = () => !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
  
    const enterFs = async () => {
      const el = imgRef.current;
      if (!el) return;
      try {
        if (el.requestFullscreen) await el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        else if (el.msRequestFullscreen) el.msRequestFullscreen();
        else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      } catch (_) {}
    };
    const exitFs = async () => {
      try {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      } catch (_) {}
    };
    const toggleFs = () => (isFullscreen() ? exitFs() : enterFs());
  
    useKey((e) => {
      if (!items.length) return;
      const k = e.key.toLowerCase();
      if (k === "escape") {
        if (isFullscreen()) exitFs(); else onClose();
      }
      if (k === "arrowleft") onPrev();
      if (k === "arrowright") onNext();
      if (k === "f") toggleFs();
    });
  
    useEffect(() => {
      document.body.style.overflow = "hidden";
      const onChange = () => setIsFs(isFullscreen());
      document.addEventListener("fullscreenchange", onChange);
      document.addEventListener("webkitfullscreenchange", onChange);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("fullscreenchange", onChange);
        document.removeEventListener("webkitfullscreenchange", onChange);
        if (isFullscreen()) exitFs();
      };
    }, []);
  
    const img = items[index];
    if (!img) return null;
  
    return (
      <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm">
        <div className="absolute right-4 top-4 flex gap-2">
          <button aria-label="Close" onClick={onClose} className="rounded-full bg-white/10 px-3 py-1.5 text-white hover:bg-white/20">✕</button>
          <button aria-label={isFs ? "Exit full screen" : "Enter full screen"} onClick={toggleFs} className="rounded-full bg-white/10 px-3 py-1.5 text-white hover:bg-white/20" title="Toggle full screen (F)">⛶</button>
        </div>
        <button aria-label="Prev" onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-1.5 text-white hover:bg-white/20">‹</button>
        <button aria-label="Next" onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-1.5 text-white hover:bg-white/20">›</button>
  
        <div className="mx-auto flex h-full max-w-[96vw] items-center justify-center px-4">
          <figure className="w-full">
            <img
              ref={imgRef}
              src={r2(img.src.replace(/^\/+/, ""))}
              alt={img.alt || "Large photo"}
              className="mx-auto max-h-[92vh] w-auto object-contain rounded-none"
              onDoubleClick={toggleFs}
            />
            {img.exif && (
              <figcaption
                className="mx-auto mt-4 max-w-3xl rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/80"
                style={{ fontFamily: '"Courier New", Courier, monospace' }}
              >
                <div style={{ width: "fit-content", margin: "auto" }}>
                    <span className="mr-3">{img.exif.desc}</span>
                    <span className="mr-3">{img.exif.camera}</span>
                    <span className="mr-3">{img.exif.lens}</span>
                    <span className="mr-3">ISO {img.exif.iso}</span>
                    <span className="mr-3">{img.exif.f}</span>
                    <span>{img.exif.s}</span>
                </div>
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    );
  }
  

// Lightbox helper
function wrapIndex(i, len, delta) {
  if (len <= 0 || i == null) return i;
  return (i + delta + len) % len;
}

export default function Photography() {
  useTailwindOnThisPage();

  const [activeAlbum, setActiveAlbum] = useState("all");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);


  // Counts for badges
  const counts = useMemo(() => {
    const c = {};
    for (const img of IMAGES) c[img.album] = (c[img.album] || 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(() => {
    if (activeAlbum === "all") return IMAGES;
    return IMAGES.filter((x) => x.album === activeAlbum);
  }, [activeAlbum]);

  const { list, more, sentinelRef, reset } = useInfinite(filtered, 24);

  useEffect(() => { reset(); }, [filtered]);

  const openAt = (i) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i == null ? null : wrapIndex(i, filtered.length, -1)));
  const next = () => setLightboxIndex((i) => (i == null ? null : wrapIndex(i, filtered.length, +1)));

  return (
    <div className="bg-neutral-950 text-neutral-50" style={{ minHeight: "100vh"}}>
      <Nav onAboutClick={() => setAboutOpen(true)} />

      {/* Portfolio */}
      <section id="portfolio" style={{paddingTop: "50px", paddingLeft: "10px", paddingRight: "10px"}} className="mx-auto w-full max-w-none px-2 sm:px-3 md:px-4 lg:px-6 xl:px-0 py-6">        
        
        {/* TODO: Add this back eventually */}
        {/* <AlbumFilter active={activeAlbum} counts={counts} onChange={setActiveAlbum} /> */}

        <div className="mt-6">
          <JustifiedGallery items={list} onOpen={openAt} />
          {more && <div ref={sentinelRef} className="h-12" />}
          {!list.length && (
            <p className="text-sm text-neutral-500">No images in this album yet.</p>
          )}
        </div>
      </section>

      {/* About modal */}
      {aboutOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold">About {BRAND}</h3>
                <p className="mt-2 text-sm text-neutral-600">
                    Bio filler text.
                </p>
              </div>
              <button className="rounded-full bg-neutral-100 px-3 py-1.5 text-sm hover:bg-neutral-200" onClick={() => setAboutOpen(false)}>✕</button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex != null && (
        <Lightbox items={filtered} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
      )}

    {/* Contact
        <footer id="contact" className="border-t border-neutral-200 bg-white py-10">
            <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                <h4 className="text-lg font-semibold">Get in touch</h4>
                <p className="text-sm text-neutral-600">For licensing, prints, or assignments.</p>
                </div>
                <div className="flex items-center gap-3">
                <a className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90" href="mailto:you@example.com">Email</a>
                <a className="rounded-full border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40" href="https://instagram.com/yourhandle" target="_blank" rel="noreferrer">Instagram</a>
                <a className="rounded-full border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40" href="https://prints.example.com" target="_blank" rel="noreferrer">Prints</a>
                </div>
            </div>
            <p className="mt-6 text-xs text-neutral-500">© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
            </div>
        </footer>
    */ }
      
    </div>
  );
}

// --- Lightweight test cases (manual) ---
export const TEST_CASES = {
  wrapIndex: [
    { i: 0, len: 5, delta: -1, expect: 4 },
    { i: 0, len: 5, delta: +1, expect: 1 },
    { i: 4, len: 5, delta: +1, expect: 0 },
    { i: 2, len: 5, delta: -3, expect: 4 },
  ],
  classNames: [
    { args: ["a", false && "b", "c"], expect: "a c" },
    { args: [null, undefined, "x"], expect: "x" },
  ],
  justifiedRows: (() => {
    const items = [
      { w: 1600, h: 900, src: "a" },
      { w: 1200, h: 800, src: "b" },
      { w: 800, h: 1200, src: "c" },
    ];
    const rows = buildJustifiedRows(items, 1000, 10, 200, false);
    return [
      { name: "rows>=1", pass: rows.length >= 1 },
      { name: "noZeroDims", pass: rows.flat().every((im) => im.width > 0 && im.height > 0) },
    ];
  })(),
};

export function runSmokeTests() {
  const results = [];
  // wrapIndex tests
  for (const t of TEST_CASES.wrapIndex) {
    const got = wrapIndex(t.i, t.len, t.delta);
    results.push({ name: `wrapIndex(${t.i},${t.len},${t.delta})`, pass: got === t.expect, got, expect: t.expect });
  }
  // classNames tests
  for (const t of TEST_CASES.classNames) {
    const got = classNames(...t.args);
    results.push({ name: `classNames(${t.args.join(",")})`, pass: got === t.expect, got, expect: t.expect });
  }
  // justifiedRows tests
  for (const t of TEST_CASES.justifiedRows) {
    results.push({ name: t.name, pass: !!t.pass, got: t.pass, expect: true });
  }
  const ok = results.every(r => r.pass);
  // eslint-disable-next-line no-console
  console.table(results);
  if (!ok) throw new Error("Smoke tests failed");
  return ok;
}

if (typeof window !== "undefined" && window.location && window.location.hash === "#run-tests") {
  try { runSmokeTests(); } catch (e) { /* eslint-disable-next-line no-console */ console.error(e); }
}
