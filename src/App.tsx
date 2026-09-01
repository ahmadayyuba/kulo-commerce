import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { LoginModal } from './components/auth/LoginModal';
import { RegisterModal } from './components/auth/RegisterModal';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
          onLoginClick={() => setIsLoginModalOpen(true)}
          onRegisterClick={() => setIsRegisterModalOpen(true)}
          onSelectCategory={(category) => setSelectedCategory(category)}
        />

        <HomePage onAddToCart={handleAddToCart} />
      </div>

      <Footer />

      {/* POP-UP MODAL LOGIN */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          alert('Login Berhasil!');
        }}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true); // Pindah ke Register Modal
        }}
      />

      {/* POP-UP MODAL REGISTER */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegisterSuccess={() => {
          setIsLoggedIn(true);
          alert('Registrasi Berhasil! Anda otomatis login.');
        }}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true); // Pindah ke Login Modal
        }}
      />
    </div>
  );
}