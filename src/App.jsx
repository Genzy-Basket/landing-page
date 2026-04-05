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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  )
}

export default App
