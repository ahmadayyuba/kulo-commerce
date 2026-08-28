import { Product } from "../../types/product";
import { StarIcon } from "../../assets/icons/icon";

interface ProductCardProps {
    product:  Product;
    variant?: 'default' | 'compact';
    onClick?: () => void;
    className?: string;
}

export const ProductCard = ({
    product,
    variant = 'default',
    onClick,
    className = '',
}: ProductCardProps) => {
    
const formatUSD = (price: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
};

    const isCompact = variant === 'compact';

    return(
        <div
            onClick={onClick}
            className={`group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-sm transition-all duration-200 cursor-pointer overflow-hidden flex flex-col ${isCompact ? 'w-48 p-3' : 'w-full max-w-[280px] p-4'} ${className}`}
        >
            <div className="w-full aspect-square bg-slate-100 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <span className="text-xs text-slate-400">
                        No Image
                    </span>
                )}
            </div>

      {/* Informasi Produk */}
    <div className="flex flex-col flex-1 justify-between space-y-2">
        <div>
        <h3 className={`font-normal text-slate-800 line-clamp-1 ${
            isCompact ? 'text-xs' : 'text-sm'
        }`}>
            {product.name}
        </h3>
        <p className={`font-bold text-slate-900 mt-1 ${
            isCompact ? 'text-sm' : 'text-base'
        }`}>
            {formatUSD(product.price)}
        </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 pt-1">
            <StarIcon className={`text-amber-400 ${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
            <span className={`font-semibold text-slate-700 ${isCompact ? 'text-xs' : 'text-sm'}`}>
            {product.rating.toFixed(1)}
            </span>
        </div>
    </div>
    </div>
);
};