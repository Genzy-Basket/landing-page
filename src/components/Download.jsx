import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GooglePlayIcon from "./GooglePlayIcon";

const floatingEmojis = [
  { emoji: "🥕", top: "15%", left: "6%", duration: "6s", delay: "0s" },
  { emoji: "🍎", top: "30%", right: "7%", duration: "7s", delay: "1s" },
  { emoji: "🥦", bottom: "18%", left: "8%", duration: "8s", delay: "0.5s" },
];

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: `${5 + Math.random() * 90}%`,
  size: 2 + Math.random() * 3,
  duration: `${4 + Math.random() * 6}s`,
  delay: `${Math.random() * 5}s`,
  opacity: 0.15 + Math.random() * 0.35,
}));

export default function Download() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="download"
      ref={ref}
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #099E0E, #078A0C)" }}
    >
      {/* CSS keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-18px) rotate(6deg); }
          75% { transform: translateY(10px) rotate(-6deg); }
        }
        @keyframes particleRise {
          0% { transform: translateY(0) scale(1); opacity: var(--p-opacity); }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
        @keyframes revealUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { left: -75%; }
          100% { left: 125%; }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <span
          key={`p-${i}`}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: p.left,
            bottom: "-4px",
            width: p.size,
            height: p.size,
            "--p-opacity": p.opacity,
            opacity: p.opacity,
            animation: `particleRise ${p.duration} ${p.delay} linear infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Floating emojis — CSS only */}
      {floatingEmojis.map((item, index) => (
        <span
          key={index}
          className="absolute text-4xl md:text-5xl select-none pointer-events-none opacity-20"
          style={{
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
            animation: `float ${item.duration} ${item.delay} ease-in-out infinite`,
            willChange: "transform",
          }}
        >
          {item.emoji}
        </span>
      ))}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Heading with reveal mask */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.01 }}
          >
            <span
              className="inline-block"
              style={
                isInView
                  ? {
                      animation:
                        "revealUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
                    }
                  : { transform: "translateY(100%)" }
              }
            >
              Ready to Get Fresh Groceries?
            </span>
          </motion.h2>
        </div>

        <motion.p
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Subscribe for daily fresh groceries delivered before 8 AM with zero
          delivery charges. Download Genzy Basket now!
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="inline-flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Google Play button with pulsing rings */}
          <div className="relative">
            <span
              className="absolute inset-0 rounded-2xl border-2 border-white/40 pointer-events-none"
              style={{
                animation: "pulseRing 2s ease-out infinite",
              }}
            />
            <span
              className="absolute inset-0 rounded-2xl border-2 border-white/30 pointer-events-none"
              style={{
                animation: "pulseRing 2s 0.6s ease-out infinite",
              }}
            />

            <motion.a
              href="https://play.google.com/store/apps/details?id=com.genzybasket.app"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-4 bg-white text-gray-900 px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span
                className="absolute top-0 h-full w-3/4 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(9,158,14,0.12) 45%, rgba(9,158,14,0.22) 50%, rgba(9,158,14,0.12) 55%, transparent 70%)",
                  animation: "shimmer 2.5s ease-in-out infinite",
                }}
              />
              <GooglePlayIcon className="w-8 h-8 relative z-10" />
              <div className="text-left relative z-10">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  Get it on
                </div>
                <div className="text-xl font-bold leading-tight">
                  Google Play
                </div>
              </div>
            </motion.a>
          </div>

          {/* Instagram button */}
          <motion.a
            href="https://www.instagram.com/genzybasket/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm text-white px-8 py-4 rounded-2xl text-lg font-semibold border border-white/30 hover:bg-white/25 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <div className="text-left">
              <div className="text-xs uppercase tracking-wide text-white/70">
                Follow us on
              </div>
              <div className="text-xl font-bold leading-tight">Instagram</div>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
