import { useState, useEffect} from 'react';
import { Product} from '../types/product';
import { fetchProducts} from '../service/productService';
import { ProductCard} from '../components/ui/ProductCard';
import { SearchIcon } from '../assets/icons/icon';
import { EmptySearchIllustration } from '../components/illustrations/EmptyIllustrations';

interface SearchPageProps {
    searchQuery: string;
    onAddToCart?: () => void;
}

export const SearchPage = ({ searchQuery, onAddToCart}: SearchPageProps) => {
    const  [products, setProducts] = useState<Product[]>([])
    const  [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
            } catch (error){
                console.error('Error fetching search products:', error);
            } finally{
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    const filteredProducts = products.filter(p  =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
const recommendations = products.slice(0, 5);

    if (loading) {
    return (
        <div className="max-w-[1280px] mx-auto px-4 py-12 flex justify-center">
            <div className="text-slate-500 font-medium animate-pulse">Loading products...</div>
        </div>
    );
    }

    return (
    <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. KONDISI KATA KUNCI KOSONG */}
        {!searchQuery.trim() && (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
            <SearchIcon className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">No keywords yet</h2>
            <p className="text-sm text-slate-500">Type something to explore products</p>
        </div>
    )}

      {/* 2. KONDISI HASIL PENCARIAN TIDAK DITEMUKAN */}
        {searchQuery.trim() !== '' && filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
            <EmptySearchIllustration className="w-36 h-36" />
            <h2 className="text-xl font-bold text-slate-900">
                No results found for "{searchQuery}"
            </h2>
            <p className="text-sm text-slate-500">
                Try another keywords or check your spelling
            </p>
        </div>
        )}

    {/* 3. KONDISI HASIL PENCARIAN DITEMUKAN */}
    {searchQuery.trim() !== '' && filteredProducts.length > 0 && (
        <section className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900">
            Search Results for "{searchQuery}" ({filteredProducts.length})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
                <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                />
            ))}
        </div>
        </section>
    )}

    {/* REKOMENDASI PRODUK (Tampil jika kata kunci kosong atau hasil tidak ditemukan) */}
    {(searchQuery.trim() === '' || filteredProducts.length === 0) && (
        <section className="space-y-6 pt-6 border-t border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Recommendation Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {recommendations.map((product) => (
            <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
            />
            ))}
        </div>
        </section>
    )}
    </main>
);
};