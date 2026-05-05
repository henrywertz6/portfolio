import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { photos, cloudinaryUrl } from "../data";

const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

export default function Photography() {
  const [selected, setSelected] = useState<number | null>(null);
  const [fullReady, setFullReady] = useState(false);

  const close = useCallback(() => setSelected(null), []);

  const prev = useCallback(() => {
    setFullReady(false);
    setSelected((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, []);

  const next = useCallback(() => {
    setFullReady(false);
    setSelected((i) => (i === null ? null : (i + 1) % photos.length));
  }, []);

  useEffect(() => {
    if (selected === null) return;
    setFullReady(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <>
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-[#f5f0e8] px-6 pt-28 pb-16 text-[#1A1C1A]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-2xl font-medium mb-10 tracking-wide"
          >
            Photography
          </motion.h1>

          <div style={{ columns: "2 280px", gap: "12px" }}>
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                onClick={() => setSelected(i)}
                className="mb-3 overflow-hidden rounded-sm break-inside-avoid bg-[#e8e3db] cursor-pointer"
                style={{ aspectRatio: `${photo.w} / ${photo.h}` }}
              >
                <img
                  src={cloudinaryUrl(photo.id, 900)}
                  alt={photo.alt}
                  loading="lazy"
                  width={photo.w}
                  height={photo.h}
                  onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                  className="w-full h-full object-cover transition-opacity duration-500 ease-out opacity-0"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.main>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={close}
          >
            {/* prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl px-3 py-2 select-none transition-colors z-10"
              aria-label="Previous"
            >
              ‹
            </button>

            {/* fixed-size container so nothing ever resizes as images load */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="grid rounded-sm shadow-2xl overflow-hidden"
              style={{
                width: `min(90vw, 90vh * ${photos[selected].w / photos[selected].h})`,
                height: `min(90vh, 90vw * ${photos[selected].h / photos[selected].w})`,
              }}
            >
              {/* thumbnail — in browser cache from grid, shows instantly */}
              <img
                key={`thumb-${selected}`}
                src={cloudinaryUrl(photos[selected].id, 900)}
                alt={photos[selected].alt}
                className="[grid-area:1/1] w-full h-full object-cover"
              />
              {/* full-res — fades in over thumbnail once loaded */}
              <img
                key={`full-${selected}`}
                src={cloudinaryUrl(photos[selected].id, 1800)}
                alt={photos[selected].alt}
                onLoad={() => setFullReady(true)}
                className="[grid-area:1/1] w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: fullReady ? 1 : 0 }}
              />
            </div>

            {/* next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl px-3 py-2 select-none transition-colors z-10"
              aria-label="Next"
            >
              ›
            </button>

            {/* close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl px-2 py-1 transition-colors z-10"
              aria-label="Close"
            >
              ✕
            </button>

            {/* counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums">
              {selected + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
