import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { fetchProductById, fetchProducts } from '../service/productService';
import { ProductCard } from '../components/ui/ProductCard';
import { StarIcon, PlusIcon, MinusIcon } from '../assets/icons/icon';
import { formatUSD } from '../utils/format';

interface ProductDetailPageProps {
  productId: number;
  onNavigateHome?: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  onBuyNow?: (product: Product, quantity: number) => void;
  onSelectProduct?: (id: number) => void;
}

export const ProductDetailPage = ({
  productId,
  onNavigateHome,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
}: ProductDetailPageProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getDetailData = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(productId);
        setProduct(data);

        const allProducts = await fetchProducts();
        const related = allProducts
          .filter((p) => p.id !== productId)
          .slice(0, 5);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      } finally {
        setLoading(false);
      }
    };

    getDetailData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  if (loading) {
    return (
      <main className="max-w-[1280px] mx-auto px-4 py-16 flex justify-center items-center">
        <div className="text-slate-500 font-medium animate-pulse">
          Loading product detail...
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="max-w-[1280px] mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Product Not Found</h2>
        <button
          onClick={onNavigateHome}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8 sm:space-y-12">
      {/* 1. BREADCRUMB NAVIGATION */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap py-1">
        <button
          onClick={onNavigateHome}
          className="hover:text-blue-600 transition-colors"
        >
          Home
        </button>
        <span>&gt;</span>
        <span className="text-slate-400">Detail</span>
        <span>&gt;</span>
        <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-[400px]">
          {product.name}
        </span>
      </nav>

      {/* 2. MAIN DETAIL SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* GAMBAR PRODUK (KIRI / ATAS MOBILE) */}
        <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 flex items-center justify-center min-h-[300px] sm:min-h-[420px]">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[260px] sm:max-h-[320px] w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* INFORMASI PRODUK (KANAN / BAWAH MOBILE) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* Kategori & Judul */}
          <div className="space-y-1 sm:space-y-2">
            <span className="text-xs font-semibold text-slate-400 capitalize">
              {product.category}
            </span>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug">
              {product.name}
            </h1>
          </div>

          {/* Harga */}
          <div className="text-xl sm:text-3xl font-extrabold text-slate-900">
            {formatUSD(product.price)}
          </div>

        {/* Rating & Review Count */}
        <div className="flex items-center gap-1.5 text-sm">
            <StarIcon className="w-4 h-4 text-amber-400 fill-current" />
          <span className="font-bold text-slate-800">
        {/* ✅ Cek apakah rating bertipe object atau number */}
            {typeof product.rating === 'object' ? product.rating?.rate : product.rating || '4.5'}
          </span>
          <span className="text-slate-400">
              ({typeof product.rating === 'object' ? product.rating?.count : 470} reviews)
          </span>
        </div>

          <hr className="border-slate-100" />

          {/* Deskripsi */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Description</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description || 'No description available for this product.'}
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-1">
            <span className="text-sm font-bold text-slate-900">Quantity</span>
            <div className="flex items-center border border-slate-200 rounded-full px-3 py-1 gap-3 bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Decrease quantity"
              >
                <MinusIcon className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-bold text-slate-800 min-w-[16px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Increase quantity"
              >
                <PlusIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onAddToCart && onAddToCart(product, quantity)}
              className="w-full sm:flex-1 py-3 px-6 rounded-full border border-slate-200 bg-white text-slate-800 font-bold text-sm hover:bg-slate-50 transition-all text-center"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => onBuyNow && onBuyNow(product, quantity)}
              className="w-full sm:flex-1 py-3 px-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all text-center"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* 3. RELATED PRODUCT SECTION */}
      <section className="space-y-4 sm:space-y-6 pt-4 sm:pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Related Product
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
          {relatedProducts.map((relProduct) => (
            <ProductCard
              key={relProduct.id}
              product={relProduct}
              onAddToCart={() => onAddToCart && onAddToCart(relProduct, 1)}
              onClick={() => onSelectProduct && onSelectProduct(relProduct.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
};