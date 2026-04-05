import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  { key: "vegetables", emoji: "🥬", label: "Vegetables", bg: "bg-green-50" },
  { key: "fruits", emoji: "🍎", label: "Fruits", bg: "bg-red-50" },
  { key: "dairy_and_eggs", emoji: "🥛", label: "Dairy & Eggs", bg: "bg-blue-50" },
  { key: "meat_and_seafood", emoji: "🥩", label: "Meat & Seafood", bg: "bg-amber-50" },
  { key: "bakery", emoji: "🍞", label: "Bakery", bg: "bg-orange-50" },
  { key: "beverages", emoji: "🥤", label: "Beverages", bg: "bg-cyan-50" },
  { key: "staples_and_grains", emoji: "🌾", label: "Staples & Grains", bg: "bg-yellow-50" },
  { key: "oils_and_masalas", emoji: "🫒", label: "Oils & Masalas", bg: "bg-lime-50" },
  { key: "frozen_foods", emoji: "🧊", label: "Frozen Foods", bg: "bg-indigo-50" },
];

export default function Categories() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section id="categories" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-500 text-sm sm:text-lg">
            Browse through our wide range of products
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={`/products?category=${cat.key}`}
              className={`${cat.bg} rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            >
              <span className="text-5xl md:text-6xl">{cat.emoji}</span>
              <span className="text-sm sm:text-base font-bold text-gray-800 text-center">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
