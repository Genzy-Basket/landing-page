import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Google Maps embed — no API key needed, pointer-events disabled for static look
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31114.5!2d77.50713202870494!3d12.921955628882763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4t5!5e0!3m2!1sen!2sin!4v1700000000000";

const pulseKeyframes = `
@keyframes greenPulse {
  0% { box-shadow: 0 0 0 0 rgba(9, 158, 14, 0.35); }
  70% { box-shadow: 0 0 0 16px rgba(9, 158, 14, 0); }
  100% { box-shadow: 0 0 0 0 rgba(9, 158, 14, 0); }
}
@keyframes radiusPulse {
  0% { opacity: 0.25; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.15; transform: translate(-50%, -50%) scale(1.03); }
  100% { opacity: 0.25; transform: translate(-50%, -50%) scale(1); }
}
`;

export default function ServiceArea() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <style>{pulseKeyframes}</style>
      <section
        id="service-area"
        className="bg-surface-dim py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl" ref={ref}>
          {/* Heading */}
          <motion.div
            className="mb-8 sm:mb-14 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
              Our Delivery Area
            </h2>
            <motion.div
              className="mx-auto mt-3 h-1 w-36 sm:w-48 rounded-full bg-primary origin-left"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
            />
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-lg text-text-secondary">
              We currently deliver within 5km of RR Nagar, Bengaluru
            </p>
          </motion.div>

          {/* Map + Info card */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Static map with circle overlay */}
            <motion.div
              className="w-full lg:w-3/5"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                {/* Google Maps — interaction disabled for static look */}
                <iframe
                  title="Genzy Basket delivery area"
                  src={MAP_EMBED_URL}
                  className="w-full h-[280px] sm:h-[350px] md:h-[400px] border-0 pointer-events-none"
                  loading="lazy"
                  allowFullScreen=""
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* 5km radius circle overlay — outer glow ring */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "68%",
                    paddingBottom: "68%",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "6px solid rgba(9, 158, 14, 0.15)",
                    animation: "radiusPulse 3s ease-in-out infinite",
                  }}
                />
                {/* 5km radius circle overlay — main */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "65%",
                    paddingBottom: "65%",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "3px solid rgba(9, 158, 14, 0.8)",
                    background: "rgba(9, 158, 14, 0.18)",
                    boxShadow:
                      "0 0 20px rgba(9, 158, 14, 0.3), inset 0 0 30px rgba(9, 158, 14, 0.08)",
                  }}
                />

                {/* Center pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                  <div
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary border-3 border-white shadow-xl"
                    style={{
                      boxShadow:
                        "0 0 12px rgba(9,158,14,0.5), 0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  />
                  <div className="w-1.5 h-4 bg-primary -mt-1 rounded-b-full shadow-md" />
                </div>

                {/* Radius label */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                  <span className="text-xs sm:text-sm font-bold text-primary">
                    5 KM Radius
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Info card */}
            <motion.div
              className="w-full lg:w-2/5 flex"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="flex flex-col items-center justify-center gap-5 sm:gap-6 rounded-xl sm:rounded-2xl border border-surface-border bg-surface p-6 sm:p-8 shadow-sm w-full text-center">
                {/* Pulsing 5 KM circle */}
                <div
                  className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary/10 border-2 border-primary"
                  style={{ animation: "greenPulse 2s ease-in-out infinite" }}
                >
                  <span className="text-2xl sm:text-3xl font-extrabold text-primary leading-none">
                    5 KM
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-1">
                    Delivery Radius
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                    Pattanagere Main Road, RR Nagar,
                    <br />
                    Bengaluru 560098
                  </p>
                </div>

                {/* Areas covered */}
                <div className="w-full text-left">
                  <p className="text-xs font-semibold text-text-primary mb-2 text-center">
                    Areas We Cover
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      "RR Nagar",
                      "Pattanagere",
                      "Kengeri",
                      "Uttarahalli",
                      "Nagarbhavi",
                      "Mysore Road",
                    ].map((area) => (
                      <span
                        key={area}
                        className="text-[11px] sm:text-xs bg-primary/5 text-primary font-medium px-2.5 py-1 rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-4 py-3">
                  <span className="text-lg">🚀</span>
                  <p className="text-xs sm:text-sm font-medium text-primary">
                    We're expanding soon! More areas coming shortly.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
