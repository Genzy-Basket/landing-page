import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import GooglePlayIcon from "./GooglePlayIcon";

const API_URL = `${import.meta.env.VITE_API_URL || "https://api1.genzybasket.com/api"}/product`;

// Optimize Cloudinary images — resize + auto format + auto quality
function optimizeImage(url, width = 400) {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/w_${width},f_auto,q_auto/`);
}

const categoryMeta = {
  vegetables: {
    emoji: "🥬",
    label: "Vegetables",
    bg: "bg-green-50",
    activeBg: "bg-green-600",
  },
  fruits: {
    emoji: "🍎",
    label: "Fruits",
    bg: "bg-red-50",
    activeBg: "bg-red-500",
  },
  dairy_and_eggs: {
    emoji: "🥛",
    label: "Dairy & Eggs",
    bg: "bg-blue-50",
    activeBg: "bg-blue-500",
  },
  meat_and_seafood: {
    emoji: "🥩",
    label: "Meat & Seafood",
    bg: "bg-amber-50",
    activeBg: "bg-amber-600",
  },
  bakery: {
    emoji: "🍞",
    label: "Bakery",
    bg: "bg-orange-50",
    activeBg: "bg-orange-500",
  },
  beverages: {
    emoji: "🥤",
    label: "Beverages",
    bg: "bg-cyan-50",
    activeBg: "bg-cyan-600",
  },
  staples_and_grains: {
    emoji: "🌾",
    label: "Staples & Grains",
    bg: "bg-yellow-50",
    activeBg: "bg-yellow-600",
  },
  oils_and_masalas: {
    emoji: "🫒",
    label: "Oils & Masalas",
    bg: "bg-lime-50",
    activeBg: "bg-lime-600",
  },
  frozen_foods: {
    emoji: "🧊",
    label: "Frozen Foods",
    bg: "bg-indigo-50",
    activeBg: "bg-indigo-500",
  },
};

function ProductCard({ product }) {
  const price = product.priceConfigs?.[0];
  const hasDiscount = price && price.mrp > price.sellingPrice;
  const discountPercent = hasDiscount
    ? Math.round(((price.mrp - price.sellingPrice) / price.mrp) * 100)
    : 0;
  const isVeg = product.tags?.includes("veg");
  const isNonVeg = product.tags?.includes("non-veg");

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {product.images?.[0] ? (
          <img
            src={optimizeImage(product.images[0])}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl text-gray-200">
            📦
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute top-1.5 left-1.5 bg-primary text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md">
            {discountPercent}% OFF
          </span>
        )}

        {/* Veg / Non-veg */}
        {(isVeg || isNonVeg) && (
          <span
            className={`absolute top-1.5 right-1.5 w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-[3px] border-[1.5px] bg-white/90 flex items-center justify-center ${
              isVeg ? "border-green-600" : "border-red-600"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${isVeg ? "bg-green-600" : "bg-red-600"}`}
            />
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 sm:p-3">
        <h4 className="text-[13px] sm:text-sm font-medium text-gray-800 line-clamp-1">
          {product.name}
        </h4>
        {price && (
          <div className="mt-1.5 flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-primary">
              ₹{price.sellingPrice}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-gray-400 line-through">
                ₹{price.mrp}
              </span>
            )}
            <span className="text-[10px] text-gray-400 ml-auto font-medium">
              {price.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryButton({ categoryKey, count, isActive, onClick }) {
  const meta = categoryMeta[categoryKey] || {
    emoji: "📦",
    label: categoryKey,
    bg: "bg-gray-50",
    activeBg: "bg-primary",
  };

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1.5 px-1.5 py-3 sm:px-3 sm:py-4 rounded-xl transition-all duration-200 w-full ${
        isActive
          ? `${meta.activeBg} text-white shadow-md scale-[1.02]`
          : `${meta.bg} text-gray-700 hover:shadow-sm hover:scale-[1.02]`
      }`}
    >
      {/* Count badge */}
      <span
        className={`absolute top-1.5 right-1.5 text-[9px] sm:text-[10px] min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full font-semibold leading-none ${
          isActive
            ? "bg-white/25 text-white"
            : "bg-white text-gray-500 shadow-sm"
        }`}
      >
        {count}
      </span>

      <span className="text-[26px] sm:text-3xl drop-shadow-sm">
        {meta.emoji}
      </span>
      <span className="text-[10px] sm:text-xs font-semibold leading-tight text-center px-0.5">
        {meta.label}
      </span>
    </button>
  );
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || null,
  );

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        const data = json.data || [];
        setProducts(data.filter((p) => p.available));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const grouped = {};
  for (const p of products) {
    const cat = p.category || "other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(p);
  }

  const orderedKeys = Object.keys(categoryMeta).filter((k) => grouped[k]);
  const extraKeys = Object.keys(grouped).filter((k) => !categoryMeta[k]);
  const allCategories = [...orderedKeys, ...extraKeys];

  useEffect(() => {
    if (!loading && allCategories.length > 0 && !activeCategory) {
      setActiveCategory(allCategories[0]);
    }
    if (
      !loading &&
      activeCategory &&
      !allCategories.includes(activeCategory) &&
      allCategories.length > 0
    ) {
      setActiveCategory(allCategories[0]);
    }
  }, [loading, allCategories.length]);

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setSearchParams({ category: key }, { replace: true });
  };

  const currentProducts = grouped[activeCategory] || [];
  const activeMeta = categoryMeta[activeCategory];

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="z-30 bg-white border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
          <Link
            to="/"
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 flex-1">
            Browse Products
          </h1>
          <a
            href="https://play.google.com/store/apps/details?id=com.genzybasket.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <GooglePlayIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Get the App</span>
          </a>
        </div>
      </header>

      {/* Loading */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex-1 flex items-center justify-center text-center text-gray-400 px-4">
          <div>
            <p className="text-5xl mb-4">😕</p>
            <p className="text-lg font-medium mb-1 text-gray-600">
              Something went wrong
            </p>
            <p className="text-sm">
              Couldn't load products. Please try again later.
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      {!loading && !error && (
        <div className="flex-1 min-h-0 max-w-7xl mx-auto w-full px-2 sm:px-6 lg:px-8">
          <div className="flex gap-3 sm:gap-5 lg:gap-6 h-full py-3 sm:py-5">
            {/* Sidebar */}
            <aside className="w-[90px] sm:w-[120px] md:w-[140px] lg:w-[160px] flex-shrink-0 overflow-y-auto scrollbar-hide">
              <div className="flex flex-col gap-2 sm:gap-2.5">
                {allCategories.map((key) => (
                  <CategoryButton
                    key={key}
                    categoryKey={key}
                    count={grouped[key].length}
                    isActive={activeCategory === key}
                    onClick={() => handleCategoryChange(key)}
                  />
                ))}
              </div>
            </aside>

            {/* Divider */}
            <div className="w-px bg-gray-200 self-stretch" />

            {/* Products */}
            <main className="flex-1 min-w-0 overflow-y-auto scrollbar-hide">
              {activeCategory && (
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">
                    {activeMeta?.emoji || "📦"}
                  </span>
                  <h2 className="text-base sm:text-xl font-bold text-gray-900">
                    {activeMeta?.label || activeCategory}
                  </h2>
                  <span className="text-xs text-gray-400 font-medium">
                    ({currentProducts.length} items)
                  </span>
                </div>
              )}

              {currentProducts.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-center text-gray-400">
                  <div>
                    <p className="text-4xl mb-3">🫙</p>
                    <p className="font-medium text-gray-600">
                      No products found
                    </p>
                    <p className="text-sm mt-1">
                      This category is empty right now.
                    </p>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pb-4"
                  >
                    {currentProducts.map((product, i) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.03 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
