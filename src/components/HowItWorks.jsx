import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    emoji: '📱',
    title: 'Download & Subscribe',
    description:
      'Get Genzy Basket from Google Play Store, pick your products and choose your delivery dates for the month',
  },
  {
    number: '02',
    emoji: '👛',
    title: 'Pay from Wallet',
    description:
      'Recharge your wallet and pay for your subscription upfront — no hidden fees, zero delivery charges',
  },
  {
    number: '03',
    emoji: '🌅',
    title: 'Fresh Before 8 AM',
    description:
      'Sit back! Your subscription products arrive fresh at your doorstep every morning before 8 AM',
  },
];

const headingText = 'How It Works';

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' },
  }),
};

const stepVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.6 + i * 0.3,
      duration: 0.6,
      ease: [0.175, 0.885, 0.32, 1.1],
    },
  }),
};

const emojiVariants = {
  hidden: { opacity: 0, y: -60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.9 + i * 0.3,
      type: 'spring',
      stiffness: 400,
      damping: 12,
      mass: 0.8,
    },
  }),
};

const rippleKeyframes = `
@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
}
`;

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-surface-dim py-20 sm:py-24"
    >
      <style>{rippleKeyframes}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading — letter by letter */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary flex justify-center flex-wrap">
            {headingText.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className={char === ' ' ? 'w-3' : ''}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-4 text-lg text-text-secondary"
          >
            Get your groceries in 3 simple steps
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Connector line — desktop (horizontal, draws left to right) */}
          <motion.div
            className="hidden md:block absolute top-24 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 origin-left"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.8, duration: 1.2, ease: 'easeInOut' }}
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, var(--color-primary) 0, var(--color-primary) 8px, transparent 8px, transparent 16px)',
              opacity: 0.35,
            }}
          />

          {/* Connector line — mobile (vertical, draws top to bottom) */}
          <motion.div
            className="md:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 origin-top"
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.8, duration: 1.2, ease: 'easeInOut' }}
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, var(--color-primary) 0, var(--color-primary) 8px, transparent 8px, transparent 16px)',
              opacity: 0.35,
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              custom={i}
              variants={stepVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="relative z-10 flex flex-col items-center text-center"
              style={{ perspective: '800px' }}
            >
              {/* Card with 3D tilt on hover */}
              <motion.div
                className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-xs cursor-default"
                whileHover={{
                  rotateY: 6,
                  rotateX: -4,
                  scale: 1.03,
                  boxShadow:
                    '0 20px 40px -12px rgba(0,0,0,0.15)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Step number with ripple */}
                <div className="relative mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-primary/10" />
                  {/* Ripple rings */}
                  <span
                    className="absolute inset-0 rounded-full bg-primary/20"
                    style={{
                      animation: 'ripple 2.5s ease-out infinite',
                      animationDelay: `${i * 0.4}s`,
                    }}
                  />
                  <span
                    className="absolute inset-0 rounded-full bg-primary/15"
                    style={{
                      animation: 'ripple 2.5s ease-out infinite',
                      animationDelay: `${i * 0.4 + 0.8}s`,
                    }}
                  />
                  <span className="relative text-2xl font-bold text-primary">
                    {step.number}
                  </span>
                </div>

                {/* Emoji — drops in from above with bounce */}
                <motion.div
                  custom={i}
                  variants={emojiVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="text-4xl mb-4"
                >
                  {step.emoji}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
