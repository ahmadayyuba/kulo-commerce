import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { CategoryPage } from './pages/CategoryPage';
import { LoginModal } from './components/auth/LoginModal';
import { RegisterModal } from './components/auth/RegisterModal';
import { ProductDetailPage } from './pages/ProductDetailPage';

export default function App() {
  const [selectedCategory, setSelectedCategory, ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
<Header
  cartCount={cartCount}
  isLoggedIn={isLoggedIn}
  userName="John Doe"
  selectedCategory={selectedCategory}
  onSelectCategory={(cat) => {
    setSelectedCategory(cat);
    setSelectedProductId(null);
  }}
  onSearch={(val) => {
    setSearchQuery(val);
    setSelectedProductId(null);
  }}
  onGoHome={() => {
    setSelectedProductId(null);
    setSelectedCategory(null);
    setSearchQuery('');
  }}
  onLoginClick={() => setIsLoginModalOpen(true)}
  onRegisterClick={() => setIsRegisterModalOpen(true)}
/>

{/* PENGONDISIAN HALAMAN */}
{selectedProductId ? (
  <ProductDetailPage
    productId={selectedProductId}
    onNavigateHome={() => setSelectedProductId(null)}
    onAddToCart={handleAddToCart}
    onBuyNow={handleAddToCart}
    onSelectProduct={(id) => setSelectedProductId(id)}
  />
) : searchQuery ? (
  <SearchPage
    searchQuery={searchQuery}
    onAddToCart={handleAddToCart}
    onSelectProduct={(id) => setSelectedProductId(id)}
  />
) : selectedCategory ? (
  <CategoryPage
    selectedCategory={selectedCategory}
    onSelectCategory={(cat) => setSelectedCategory(cat)}
    onAddToCart={handleAddToCart}
    onSelectProduct={(id) => setSelectedProductId(id)}
  />
) : (
  <HomePage
    onAddToCart={handleAddToCart}
    onSelectProduct={(id) => setSelectedProductId(id)}
  />
)}
      </div>

      <Footer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => setIsLoggedIn(true)}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegisterSuccess={() => setIsLoggedIn(true)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
}