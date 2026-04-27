import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const API_BASE =
  import.meta.env.VITE_API_URL || "https://api.genzybasket.com/api";
const PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.genzybasket.app";

/**
 * Share landing page — shown when a deep link is opened on a device that
 * doesn't have the Genzy Basket app installed (or in a desktop browser).
 *
 * `kind` is either "reel" (URL: /r/:id) or "dish" (URL: /d/:id).
 * Same component, slightly different copy + which API endpoint it hits.
 */
export default function SharePage({ kind }) {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    const path = kind === "reel" ? `/dishes/reels/${id}` : `/dishes/${id}`;
    fetch(`${API_BASE}${path}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((j) => {
        if (cancelled) return;
        if (j?.success && j?.data) setDish(j.data);
        else setError("Not found");
      })
      .catch(() => !cancelled && setError("Could not load this dish"));
    return () => {
      cancelled = true;
    };
  }, [id, kind]);

  // Update document title + OG tags so WhatsApp/Twitter previews are nice
  useEffect(() => {
    if (!dish) return;
    document.title = `${dish.title} — Genzy Basket`;
    setMeta("og:title", dish.title);
    if (dish.description) setMeta("og:description", dish.description);
    const img = dish.dishImages?.[0];
    if (img) setMeta("og:image", img);
    setMeta("og:type", kind === "reel" ? "video.other" : "article");
    setMeta("og:url", window.location.href);
  }, [dish, kind]);

  const openInApp = () => {
    // Re-trigger the App Link. If installed and verified → opens app; else
    // Android falls through to this very page, so we then push to the store.
    const appUrl = window.location.href;
    window.location.href = appUrl;
    setTimeout(() => {
      window.location.href = PLAY_URL;
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {dish?.dishImages?.[0] && (
          <div className="relative">
            <img
              src={dish.dishImages[0]}
              alt={dish.title}
              className="w-full h-64 object-cover"
            />
            {kind === "reel" && dish.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="bg-white/90 rounded-full p-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-green-600"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          {error && (
            <p className="text-center text-gray-500">{error}</p>
          )}
          {!error && !dish && (
            <p className="text-center text-gray-400">Loading…</p>
          )}
          {dish && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {dish.title}
              </h1>
              {dish.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {dish.description}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mb-6">
                {dish.cuisine && <Chip label={dish.cuisine} />}
                {dish.prepTimeMinutes != null && (
                  <Chip label={`${dish.prepTimeMinutes} min`} />
                )}
                {dish.servesCount != null && (
                  <Chip label={`Serves ${dish.servesCount}`} />
                )}
              </div>
            </>
          )}

          <button
            onClick={openInApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
          >
            {kind === "reel" ? "Watch in app" : "Open in app"}
          </button>
          <a
            href={PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center text-sm text-gray-500 hover:text-gray-700"
          >
            Get the app on Google Play
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function Chip({ label }) {
  return (
    <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
      {label}
    </span>
  );
}

function setMeta(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}
