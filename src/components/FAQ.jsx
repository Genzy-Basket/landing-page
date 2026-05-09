import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const faqs = [
  {
    q: "Which areas does Genzy Basket deliver to in Bengaluru?",
    a: "We currently deliver fresh groceries across RR Nagar, Pattanagere, Channasandra, Ideal Homes Township, BEML Layout and surrounding neighbourhoods within a 5 km radius of Pattanagere Main Road. We are expanding to more pin codes across Bengaluru — check serviceability inside the app.",
  },
  {
    q: "What time will my groceries be delivered?",
    a: "All subscription orders are delivered fresh to your doorstep before 8 AM every morning, so your kitchen is stocked before the day starts.",
  },
  {
    q: "Are there any delivery charges?",
    a: "No. Genzy Basket charges zero delivery fees on all subscription orders. You only pay for the groceries — no platform fees, no hidden charges.",
  },
  {
    q: "How does the grocery subscription work?",
    a: "Download the Genzy Basket app from Google Play, pick the products you want (vegetables, fruits, dairy, eggs and more), select the dates you want them delivered for the month, and recharge your wallet. Your selected products arrive fresh every chosen morning before 8 AM.",
  },
  {
    q: "Can I skip a day or pause my subscription?",
    a: "Yes. You can skip individual delivery dates, pause your subscription, or modify items right inside the app — as long as you make changes before the daily cut-off (10 PM the previous night).",
  },
  {
    q: "How fresh are the vegetables and fruits?",
    a: "We source produce directly from farms and local mandis the same morning. Items are sorted, weighed and packed only after your delivery cut-off, so what you receive at 8 AM was not sitting in a warehouse for days.",
  },
  {
    q: "What products can I subscribe to?",
    a: "Vegetables, fruits, dairy (milk, curd, paneer), eggs, bread and daily essentials. The full catalogue is available inside the app and updated regularly.",
  },
  {
    q: "How do payments and the wallet work?",
    a: "Genzy Basket uses a prepaid wallet model. You recharge once and the daily subscription cost is auto-deducted on each delivery. This keeps things transparent and avoids per-order payment friction.",
  },
  {
    q: "What if an item is missing or not fresh?",
    a: "Report it inside the app within 24 hours of delivery and we will refund the amount to your wallet — no questions asked.",
  },
  {
    q: "Is Genzy Basket available on iOS?",
    a: "Right now we are live on Android via Google Play. An iOS version is on the roadmap — follow @genzybasket on Instagram for launch updates.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      ref={ref}
      className="bg-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-primary bg-primary-light rounded-full">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            Everything you need to know
          </h2>
          <p className="text-base sm:text-lg text-text-secondary">
            Quick answers about delivery, subscriptions and how Genzy Basket works.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }}
                className={`rounded-xl border bg-white transition-all ${
                  isOpen
                    ? "border-primary/40 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                    {item.q}
                  </h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex-shrink-0 ${
                      isOpen ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm sm:text-base text-text-secondary leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-text-secondary">
            Still have questions?{" "}
            <a
              href="mailto:genzybasket@gmail.com"
              className="text-primary font-semibold hover:underline"
            >
              Email us
            </a>{" "}
            or{" "}
            <a
              href="tel:+916363784290"
              className="text-primary font-semibold hover:underline"
            >
              call +91 63637 84290
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
