import { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { CategoryPage } from './pages/CategoryPage';
import { AllCategoriesPage } from './pages/AllCategoriesPage';
import { LoginModal } from './components/auth/LoginModal';
import { RegisterModal } from './components/auth/RegisterModal';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { supabase } from './lib/supabase';
import { CartItem } from './types/cart';
import { Product } from './types/product';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartPageOpen, setIsCartPageOpen] = useState(false);
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const [isCheckoutPageOpen, setIsCheckoutPageOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      if (session?.user) {
        setUserName(
          session.user.user_metadata?.full_name ||
          session.user.email?.split('@')[0] ||
          'User'
        );
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (session?.user) {
        setUserName(
          session.user.user_metadata?.full_name ||
          session.user.email?.split('@')[0] ||
          'User'
        );
      } else {
        setUserName('User');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUserName('User');
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: number, amount: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const resetToHome = () => {
    setIsCartPageOpen(false);
    setIsAllCategoriesOpen(false);
    setIsCheckoutPageOpen(false);
    setSelectedProductId(null);
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const handleProceedToCheckout = () => {
    setCheckoutItems(cartItems); 
    setIsCartPageOpen(false);    
    setIsCheckoutPageOpen(true); 
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    handleAddToCart(product, quantity);

    setCheckoutItems([{ product, quantity }]); 
    setSelectedProductId(null);  
    setIsCheckoutPageOpen(true); 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Header
          cartCount={totalCartCount}
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLogoutClick={handleLogout}
          selectedCategory={selectedCategory}
          onCartClick={() => {
            setIsCartPageOpen(true);
            setIsAllCategoriesOpen(false);
          }}
          onSelectCategory={(cat) => {
            setIsCartPageOpen(false);
            setIsAllCategoriesOpen(false);
            setSelectedCategory(cat);
            setSelectedProductId(null);
          }}
          onSearch={(val) => {
            setIsCartPageOpen(false);
            setIsAllCategoriesOpen(false);
            setSearchQuery(val);
            setSelectedProductId(null);
          }}
          onGoHome={resetToHome}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onRegisterClick={() => setIsRegisterModalOpen(true)}
        />

{/* PENGONDISIAN HALAMAN */}
        {isCheckoutPageOpen ? (
          <CheckoutPage
            checkoutItems={checkoutItems}
            onSelectPayment={() => {}}
          />
        ) : isCartPageOpen ? (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onContinueShopping={() => setIsCartPageOpen(false)}
            onCheckout={handleProceedToCheckout}
          />
        ) : isAllCategoriesOpen ? (
          <AllCategoriesPage
            onSelectCategory={(cat: string) => {
              setIsAllCategoriesOpen(false);
              setSelectedCategory(cat);
            }}
            onGoHome={resetToHome}
          />
        ) : selectedProductId ? (
          <ProductDetailPage
            productId={selectedProductId}
            onNavigateHome={() => setSelectedProductId(null)}
            onAddToCart={handleAddToCart}
            onBuyNow={(prod, qty) => {
              handleAddToCart(prod, qty);
              setIsCartPageOpen(true);
            }}
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
            onSelectCategory={(cat: string | null) => {
              if (cat === null) {
                resetToHome();
              } else {
                setSelectedCategory(cat);
              }
            }}
            onOpenAllCategories={() => {
              setSelectedCategory(null);
              setIsAllCategoriesOpen(true);
            }}
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