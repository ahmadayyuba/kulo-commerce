import { useEffect, useState } from "react";
import { HeroBanner } from "../components/home/HeroBanner";
import { ProductCard } from "../components/ui/ProductCard";
import { Button } from "../components/ui/button";
import { Product } from "../types/product";
import { fetchProducts } from "../service/productService";


interface HomePageProps {
    onAddToCart?: () => void;
}

export const HomePage = ({onAddToCart} : HomePageProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(10);

    useEffect(() => {
        const getProducts = async () =>{
            try {
                setLoading (true);
                const data = await fetchProducts();
                setProducts (data);
            } catch (error) {
                console.error('Error fetching products:' , error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);
    
    const handleLoadMore = () => {
        setDisplayCount((prev) => prev + 5);
    };

    return (
        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">

            {/* Hero Banner */}
            <HeroBanner/>

            {/* 2. FEATURED PRODUCTS CATALOG */}
            <section className="space-y-6">
                <div className="flex items-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Featured Products
                    </h2>
                </div>

            {/* LOADING STATE */}
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-slate-100 animate-pulse h-64 rounded-2xl" />
            ))}
            </div>
        ) : (
          /* RESPONSIVE PRODUCT GRID SYSTEM */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.slice(0, displayCount).map((product) => (
                <ProductCard
                key={product.id}
                product={product}
                onClick={() => console.log('Detail produk:', product.id)}
                onAddToCart={onAddToCart}
                />
            ))}
            </div>
        )}

        {/* 3. LOAD MORE BUTTON */}
        {!loading && displayCount < products.length && (
            <div className="flex justify-center pt-6">
            <Button variant="secondary" className="px-8 py-2.5" onClick={handleLoadMore}>
                Load More
            </Button>
            </div>
        )}
            </section>
        </main>
    )
}
