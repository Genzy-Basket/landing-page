import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Categories from './components/Categories'
import HowItWorks from './components/HowItWorks'
import ServiceArea from './components/ServiceArea'
import Download from './components/Download'
import Footer from './components/Footer'
import ProductsPage from './components/ProductsPage'
import TermsPage from './components/TermsPage'
import PrivacyPage from './components/PrivacyPage'
import RefundsPage from './components/RefundsPage'
import ContactPage from './components/ContactPage'
import DeleteAccountPage from './components/DeleteAccountPage'
import CanonicalTag from './components/CanonicalTag'

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <HowItWorks />
      <ServiceArea />
      <Download />
      <Footer />
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <CanonicalTag />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/refunds" element={<RefundsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/delete-account" element={<DeleteAccountPage />} />
      </Routes>
    </div>
  )
}

export default App
