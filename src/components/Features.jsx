import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    icon: '📅',
    title: 'Monthly Subscriptions',
    description: 'Pick your products, choose delivery dates for the month, and get fresh groceries at your doorstep before 8 AM',
  },
  {
    icon: '🚚',
    title: 'Free Delivery',
    description: 'Zero delivery charges on all subscriptions — pay only for the products you order',
  },
  {
    icon: '⏭️',
    title: 'Skip & Manage',
    description: 'Full flexibility — skip individual days or items, add extras, pause or resume your subscription anytime',
  },
  {
    icon: '🥬',
    title: 'Farm Fresh Quality',
    description: 'Handpicked fresh vegetables and fruits sourced directly from local farms',
  },
  {
    icon: '👛',
    title: 'Wallet Payments',
    description: 'Simple wallet-based payments — recharge once and pay seamlessly for all your subscriptions',
  },
  {
    icon: '📦',
    title: 'Wide Selection',
    description: 'From vegetables to dairy, staples to bakery — everything you need in one place',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function getCardVariants(index) {
  const isOdd = index % 2 === 0; // 0-indexed: 0,2,4 flip from left; 1,3,5 from right
  return {
    hidden: {
      opacity: 0,
      rotateY: isOdd ? -90 : 90,
      x: isOdd ? -60 : 60,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };
}

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const underlineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

const bounceKeyframes = `
@keyframes iconBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
`;

function FeatureCard({ feature, index }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ rotateX, rotateY });
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }

  return (
    <motion.div
      variants={getCardVariants(index)}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          y: isHovered ? -12 : 0,
          boxShadow: isHovered
            ? '0 20px 40px rgba(0,0,0,0.15)'
            : '0 1px 3px rgba(0,0,0,0.08)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative overflow-hidden rounded-xl border border-surface-border bg-surface p-8 text-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Green left border that grows on hover */}
        <motion.div
          className="absolute left-0 top-0 w-1 bg-primary rounded-l-xl"
          initial={{ height: 0 }}
          animate={{ height: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />

        <span
          className="mb-4 inline-block text-5xl"
          role="img"
          aria-label={feature.title}
          style={{
            animation: 'iconBounce 2s ease-in-out infinite',
            animationDelay: `${index * 0.2}s`,
          }}
        >
          {feature.icon}
        </span>
        <h3 className="mb-2 text-xl font-semibold text-text-primary">
          {feature.title}
        </h3>
        <p className="text-text-secondary">
          {feature.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <>
      <style>{bounceKeyframes}</style>
      <section
        id="features"
        className="bg-surface-dim py-20 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <div className="mx-auto max-w-6xl" ref={ref}>
          {/* Heading */}
          <motion.div
            className="mb-14 text-center"
            variants={headingVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              Why Choose Genzy Basket?
            </h2>
            {/* Animated green underline */}
            <motion.div
              className="mx-auto mt-3 h-1 w-48 rounded-full bg-primary origin-left"
              variants={underlineVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            />
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
              Experience the easiest way to shop for fresh groceries with features designed around you.
            </p>
          </motion.div>

          {/* Feature cards grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            style={{ perspective: 1200 }}
          >
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
