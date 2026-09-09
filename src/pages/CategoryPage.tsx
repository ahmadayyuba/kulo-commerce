import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types/product';
import { fetchProducts } from '../service/productService';
import { ProductCard } from '../components/ui/ProductCard';
import { CategoryContentFilter } from '../components/ui/CategoryContentFilter';

interface CategoryPageProps {
    selectedCategory: string;
    onSelectCategory: (category: string | null) => void;
    onOpenAllCategories: () => void;
    onAddToCart?: (product: Product) => void;
    onSelectProduct?: (id: number) => void;
}

export const CategoryPage = ({
    selectedCategory,
    onSelectCategory,
    onOpenAllCategories,
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

return (
    <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <button
            onClick={() => onSelectCategory(null)}
            className="hover:text-blue-600 transition-colors"
            >
            Home
            </button>
            <span>&gt;</span>
            <button
            onClick={onOpenAllCategories}
            className="hover:text-blue-600 transition-colors text-slate-600 font-medium"
            >
            Category
            </button>
            <span>&gt;</span>
            <span className="font-semibold text-slate-800 capitalize">
                {selectedCategory}
            </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-1 top-24">
            <CategoryContentFilter
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => onSelectCategory(cat)}
        />
        </div>

        <div className="lg:col-span-3 space-y-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 capitalize border-b border-slate-100 pb-4">
                {selectedCategory}
            </h1>

        {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="bg-slate-100 animate-pulse h-72 rounded-2xl border border-slate-200"
                    />
                ))}
                </div>
        ) : (
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
                >
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25, delay: index * 0.05 }}
                    >
                    <ProductCard
                        product={product}
                        onAddToCart={() => onAddToCart?.(product)}
                        onClick={() => onSelectProduct && onSelectProduct(product.id)}
                    />
                    </motion.div>
                ))}
                </motion.div>
            </AnimatePresence>
            )}
            </div>
        </div>
    </main>
    );
};