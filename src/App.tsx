import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import QuoteModal from './components/QuoteModal'
import FloatingContact from './components/FloatingContact'
import BottomNav from './components/BottomNav'
import { ToastProvider } from './components/Toast'
import SEO from './components/SEO'

// Import pages
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Services from './pages/Services'
import Contact from './pages/Contact'

// Import admin
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/Admin'

// Quote Modal Context
import { createContext, useContext } from 'react'

interface QuoteContextType {
  openQuoteModal: () => void;
}

const QuoteContext = createContext<QuoteContextType | null>(null);

export const useQuoteModal = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuoteModal must be used within QuoteProvider');
  }
  return context;
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout wrapper for public pages
const PublicLayout = ({ children, openQuoteModal }: { children: React.ReactNode; openQuoteModal: () => void }) => (
  <QuoteContext.Provider value={{ openQuoteModal }}>
    <SEO />
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <FloatingContact />
      <BottomNav />
    </div>
  </QuoteContext.Provider>
)

function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const openQuoteModal = () => setIsQuoteModalOpen(true);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  return (
    <ToastProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes - No Navbar/Footer */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Redirect old /admin to /admin-login */}
          <Route path="/admin" element={<Navigate to="/admin-login" replace />} />

          {/* Public Routes - With Navbar/Footer */}
          <Route path="/" element={<PublicLayout openQuoteModal={openQuoteModal}><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout openQuoteModal={openQuoteModal}><About /></PublicLayout>} />
          <Route path="/products" element={<PublicLayout openQuoteModal={openQuoteModal}><Products /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout openQuoteModal={openQuoteModal}><Services /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout openQuoteModal={openQuoteModal}><Contact /></PublicLayout>} />
          <Route path="/quote" element={<PublicLayout openQuoteModal={openQuoteModal}><Contact /></PublicLayout>} />
        </Routes>

        {/* Quote Modal - available globally */}
        <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
