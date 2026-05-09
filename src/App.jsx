import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Categories from "./components/Categories";
import HowItWorks from "./components/HowItWorks";
import ServiceArea from "./components/ServiceArea";
import FAQ from "./components/FAQ";
import Download from "./components/Download";
import Footer from "./components/Footer";
import CanonicalTag from "./components/CanonicalTag";

const ProductsPage = lazy(() => import("./components/ProductsPage"));
const TermsPage = lazy(() => import("./components/TermsPage"));
const PrivacyPage = lazy(() => import("./components/PrivacyPage"));
const RefundsPage = lazy(() => import("./components/RefundsPage"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const DeleteAccountPage = lazy(() => import("./components/DeleteAccountPage"));
const SharePage = lazy(() => import("./components/SharePage"));

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <HowItWorks />
      <ServiceArea />
      <FAQ />
      <Download />
      <Footer />
    </>
  );
}

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-gray-200 border-t-primary animate-spin" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <CanonicalTag />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/products"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProductsPage />
            </Suspense>
          }
        />
        <Route
          path="/terms"
          element={
            <Suspense fallback={<RouteFallback />}>
              <TermsPage />
            </Suspense>
          }
        />
        <Route
          path="/privacy"
          element={
            <Suspense fallback={<RouteFallback />}>
              <PrivacyPage />
            </Suspense>
          }
        />
        <Route
          path="/refunds"
          element={
            <Suspense fallback={<RouteFallback />}>
              <RefundsPage />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path="/delete-account"
          element={
            <Suspense fallback={<RouteFallback />}>
              <DeleteAccountPage />
            </Suspense>
          }
        />
        <Route
          path="/r/:id"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SharePage kind="reel" />
            </Suspense>
          }
        />
        <Route
          path="/d/:id"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SharePage kind="dish" />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
