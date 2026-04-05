import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import GooglePlayIcon from "./GooglePlayIcon";

// --- Typewriter hook ---
function useTypewriter(text, speed = 35, startDelay = 800) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeout;

    const startTimeout = setTimeout(() => {
      const tick = () => {
        if (i < text.length) {
          i++;
          setDisplayed(text.slice(0, i));
          timeout = setTimeout(tick, speed);
        } else {
          setDone(true);
        }
      };
      tick();
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

const floatingEmojis = [
  { emoji: "🥕", x: "8%", y: "10%", delay: "0s", dur: "5s", size: "text-7xl" },
  { emoji: "🍎", x: "68%", y: "5%", delay: "0.7s", dur: "6s", size: "text-8xl" },
  { emoji: "🥦", x: "78%", y: "55%", delay: "1.4s", dur: "5.5s", size: "text-7xl" },
  { emoji: "🍅", x: "15%", y: "65%", delay: "2.1s", dur: "6.5s", size: "text-6xl" },
  { emoji: "🥬", x: "45%", y: "75%", delay: "0.5s", dur: "5.8s", size: "text-7xl" },
  { emoji: "🍋", x: "55%", y: "20%", delay: "1.8s", dur: "6.2s", size: "text-6xl" },
];


const headingLines = [
  { text: "Fresh Groceries,", delay: 0 },
  { text: "Subscribed &", delay: 0.3 },
  { text: "Delivered Daily", delay: 0.6 },
];

const subtitleText =
  "Subscribe for daily fresh groceries delivered to your doorstep before 8 AM. Zero delivery charges on subscriptions. Quality you can trust.";

// --- Framer variants ---
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const badgeBounce = {
  hidden: { opacity: 0, y: -60, scale: 0.8 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 18, delay: 0.1 },
  },
};

const heroStyles = `
@keyframes emoji-float {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  25% { transform: translate3d(6px, -16px, 0) rotate(6deg); }
  50% { transform: translate3d(-4px, -22px, 0) rotate(-4deg); }
  75% { transform: translate3d(4px, -10px, 0) rotate(3deg); }
}

@keyframes shimmer-sweep {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 8px 0 rgba(9, 158, 14, 0.3); }
  50% { box-shadow: 0 0 24px 6px rgba(9, 158, 14, 0.45); }
}

@keyframes chevron-bounce {
  0%, 100% { transform: translate3d(-50%, 0, 0); opacity: 1; }
  50% { transform: translate3d(-50%, 10px, 0); opacity: 0.5; }
}

@keyframes typewriter-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes orbit {
  0% { transform: rotate(0deg) translateX(160px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
}

@keyframes orbit-lg {
  0% { transform: rotate(0deg) translateX(220px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(220px) rotate(-360deg); }
}

.emoji-float {
  will-change: transform;
  animation: emoji-float var(--float-dur, 5s) ease-in-out var(--float-delay, 0s) infinite;
}

.shimmer-heading {
  background: linear-gradient(90deg, #1a2e1a 0%, #1a2e1a 35%, #099E0E 50%, #1a2e1a 65%, #1a2e1a 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-sweep 4s linear infinite;
}

.play-store-pulse {
  animation: pulse-glow 2.5s ease-in-out infinite;
}

.scroll-indicator {
  will-change: transform;
  animation: chevron-bounce 2s ease-in-out infinite;
}

.typewriter-cursor::after {
  content: "|";
  animation: typewriter-cursor 0.6s step-end infinite;
  color: #099E0E;
  font-weight: 400;
}
`;

export default function Hero() {
  const sectionRef = useRef(null);
  const rafId = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const { displayed, done } = useTypewriter(subtitleText, 30, 1000);

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mousePos.current = { x: nx, y: ny };

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(() => {
        setParallaxOffset({ x: mousePos.current.x * 12, y: mousePos.current.y * 10 });
        rafId.current = null;
      });
    }
  }, []);

  useEffect(() => {
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  const contentTransform = `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`;
  const emojiParallaxTransform = `translate3d(${-parallaxOffset.x * 1.5}px, ${-parallaxOffset.y * 1.5}px, 0)`;

  return (
    <>
      <style>{heroStyles}</style>
      <section
        ref={sectionRef}
        id="hero"
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-50 via-emerald-50 to-cyan-50"
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
            {/* Left content */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ transform: contentTransform, willChange: "transform" }}
            >
              {/* Badge */}
              <motion.div variants={badgeBounce} className="mb-6 inline-block">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-2 text-sm font-medium text-primary">
                  🥬 Subscribe & Save — Free Delivery
                </span>
              </motion.div>

              {/* Heading — line by line */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6"
              >
                {headingLines.map((line, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: line.delay, ease: "easeOut" }}
                    className="block shimmer-heading"
                  >
                    {line.text}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle with typewriter */}
              <motion.div
                variants={fadeUp}
                className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed min-h-[3.5rem]"
              >
                <p>
                  {displayed}
                  {!done && <span className="typewriter-cursor" />}
                </p>
              </motion.div>

              {/* Play Store button */}
              <motion.div variants={fadeUp} className="mb-8">
                <a
                  href="https://play.google.com/store/apps/details?id=com.genzybasket.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="play-store-pulse inline-flex items-center gap-3 rounded-xl bg-text-primary px-6 py-3.5 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <GooglePlayIcon className="h-7 w-7" />
                  <div className="text-left leading-tight">
                    <span className="block text-[10px] uppercase tracking-wider text-gray-300">
                      Get it on
                    </span>
                    <span className="block text-lg font-semibold -mt-0.5">
                      Google Play
                    </span>
                  </div>
                </a>
              </motion.div>

            </motion.div>

            {/* Right side — floating emojis composition */}
            <div
              className="flex-1 relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[550px] hidden md:block"
              style={{ transform: emojiParallaxTransform, willChange: "transform" }}
            >
              {/* Outer decorative ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                animate={{ opacity: 0.08, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 m-auto w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border-[3px] border-dashed border-primary"
              />

              {/* Inner filled circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="absolute inset-0 m-auto w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-primary"
              />

              {/* Second ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 0.06, scale: 1 }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
                className="absolute inset-0 m-auto w-[440px] h-[440px] sm:w-[520px] sm:h-[520px] rounded-full border-2 border-primary"
              />

              {/* Center emoji */}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.6 }}
                className="absolute inset-0 m-auto w-fit h-fit text-8xl sm:text-9xl select-none drop-shadow-xl"
              >
                🛒
              </motion.span>

              {/* Floating emojis around */}
              {floatingEmojis.map(({ emoji, x, y, delay, dur, size }) => (
                <span
                  key={emoji + x}
                  className={`absolute ${size} select-none drop-shadow-lg emoji-float`}
                  style={{ left: x, top: y, "--float-delay": delay, "--float-dur": dur }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll-down indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 flex flex-col items-center gap-1 text-text-secondary/60">
          <span className="text-xs tracking-wider uppercase">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </section>
    </>
  );
}
