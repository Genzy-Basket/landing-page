import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/images/logo_wordmark_tagline_white.png';

const quickLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Categories', href: '#categories' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Download', href: '#download' },
];

const legalLinks = [
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Refunds & Cancellations', to: '/refunds' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Delete Account', to: '/delete-account' },
];

const copyrightText = '\u00A9 2026 Genzy Basket. All rights reserved.';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [typedText, setTypedText] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Typing effect for copyright
  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTypedText(copyrightText.slice(0, i));
      if (i >= copyrightText.length) clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, [isInView]);

  // Show scroll-to-top after scrolling down
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: 0.3 + i * 0.1 },
    }),
  };

  return (
    <footer ref={ref} className="relative bg-[#0F172A] text-gray-300">
      <style>{`
        @keyframes logoGlow {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(255,255,255,0.15)); }
          50% { filter: drop-shadow(0 0 18px rgba(255,255,255,0.35)); }
        }
        .link-underline {
          position: relative;
        }
        .link-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1.5px;
          background: white;
          transition: width 0.3s ease;
        }
        .link-underline:hover::after {
          width: 100%;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {/* Column 1: Logo & description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <img
              src={logoWhite}
              alt="Genzy Basket"
              className="h-14 mb-4"
              style={
                isInView
                  ? { animation: 'logoGlow 3s ease-in-out infinite' }
                  : {}
              }
            />
            <p className="text-gray-400 leading-relaxed">
              Fresh groceries delivered to your doorstep
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <div>
            <motion.h3
              className="text-white text-lg font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  custom={i}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={linkVariants}
                >
                  <a
                    href={link.href}
                    className="link-underline text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <motion.h3
              className="text-white text-lg font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Legal
            </motion.h3>
            <ul className="space-y-3">
              {legalLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  custom={i}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={linkVariants}
                >
                  <Link
                    to={link.to}
                    className="link-underline text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <motion.h3
              className="text-white text-lg font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Contact
            </motion.h3>
            <ul className="space-y-3 text-gray-400">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <a
                  href="tel:+916363784290"
                  className="link-underline hover:text-white transition-colors"
                >
                  +91 6363784290
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <a
                  href="mailto:genzybasket@gmail.com"
                  className="link-underline hover:text-white transition-colors"
                >
                  genzybasket@gmail.com
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                Pattanagere Main Road, RR Nagar, Bengaluru 560098
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Divider + Typed copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm">
          <span>{typedText}</span>
          <span className="inline-block w-px h-4 bg-gray-500 align-middle ml-0.5 animate-pulse" />
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-[#099E0E] hover:bg-[#078A0C] text-white p-3 rounded-full shadow-lg transition-colors cursor-pointer"
        initial={{ opacity: 0, scale: 0 }}
        animate={
          showScrollTop
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0 }
        }
        transition={{ duration: 0.3 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
