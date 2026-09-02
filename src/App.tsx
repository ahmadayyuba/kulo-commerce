import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { LoginModal } from './components/auth/LoginModal';
import { RegisterModal } from './components/auth/RegisterModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
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
          onSearch={(val) => setSearchQuery(val)}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onRegisterClick={() => setIsRegisterModalOpen(true)}
        />

        {/* Tampilkan SearchPage jika input terisi, atau HomePage jika input kosong */}
        {searchQuery ? (
          <SearchPage searchQuery={searchQuery} onAddToCart={handleAddToCart} />
        ) : (
          <HomePage onAddToCart={handleAddToCart} />
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