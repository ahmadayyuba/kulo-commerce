import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../types/product";
import { fetchProducts } from "../service/productService";
import { ProductCard } from "../components/ui/ProductCard";
import { CategoryDropdown} from "../components/ui/CategoryDropdown";

interface CategoryPageProps {
    selectedCategory: string;
    onSelectCategory: (category: string | null) => void;
    onAddToCart?: () => void;
    onSelectProduct?: (id: number) => void;
}

export const CategoryPage = ({
    selectedCategory,
    onSelectCategory,
    onAddToCart,
    onSelectProduct,
}: CategoryPageProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategoryProducts = async () => {
            try {
            setLoading(true);
            const allProducts = await fetchProducts();
        
        // Filter produk berdasarkan kategori
        const filtered = allProducts.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
        setProducts(filtered);
        } catch (error) {
        console.error('Error fetching category products:', error);
        } finally {
        setLoading(false);
        }
    };
        getCategoryProducts();
    }, [selectedCategory]);

        const formattedCategoryName =
        selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

        return(
            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
                {/* 1. BREADCRUMB NAVIGATION */}
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-shadow-slate-500">
                    <button
                        onClick={() => onSelectCategory(null)}
                        className="hover:text-blue-600 transition-colors"
                    >
                        Home
                    </button>
                    <span>&gt;</span>
                    <span className="text-slate-400">Category</span>
                    <span>&gt;</span>
                    <span className="font-semibold text-slate-800 capitalize">
                        {selectedCategory}
                    </span>
                </nav>

            {/* 2. HEADER SECTION (Judul & Filter Dropdown) */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 capitalize">
                    {formattedCategoryName}
                </h1>

            {/* Category Filter Dropdown dengan align="right" */}
                <CategoryDropdown
                    selectedCategory={selectedCategory}
                    onSelectCategory={onSelectCategory}
                    align="right"
                />
            </div>
            
        {/* 3. PRODUCT GRID DENGAN SKELETON & ANIMASI FRAMER MOTION */}
        {loading ? (
        // SKELETON LOADING STATE
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(5)].map((_, i) => (
            <div
                key={i}
                className="bg-slate-100 animate-pulse h-72 rounded-2xl border border-slate-200"
            />
            ))}
        </div>
        ) : (
        // FRAMER MOTION ANIMATED GRID
        <AnimatePresence mode="wait">
            <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
            >
            {products.map((product, index) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                >
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onClick={() => onSelectProduct && onSelectProduct(product.id)} // ✅ Pasang callback
                />
                
                </motion.div>
                ))}
                </motion.div>
            </AnimatePresence>
            )}
        </main>
    );
};