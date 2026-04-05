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

        {/* Button with pulsing rings */}
        <motion.div
          className="inline-block relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Pulsing rings */}
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
            {/* Shimmer overlay */}
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
              <div className="text-xl font-bold leading-tight">Google Play</div>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
