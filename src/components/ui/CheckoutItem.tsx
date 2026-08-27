import { CartItemType } from "../../types/product";

interface CheckoutItemProps {
    item: CartItemType;
    className?: string;
}

export const CheckoutItem = ({ item, className = '' }: CheckoutItemProps) => {
  // Helper format harga ke Rupiah
    const formatRupiah = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

        return (
            <div className={`flex items-start sm:items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 gap-4`}>

                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                        {item.product.image  ? ( 
                        <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover" 
                        />
                        ):(
                            <span className="text-[10px] text-slate-400">No Image</span>
                        )}
                    </div>

                {/* Info Teks */}
                <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">
                        {item.product.name}
                    </h3>
                    <span className="text-xs text-slate-400 mt-0.5">
                        {item.product.category || 'Uncategorized'}
                    </span>

                    <div className="block sm:hidden mt-2">
                        <span className="font-bold text-slate-900 text-sm">
                            {item.quantity} x {formatRupiah(item.product.price)}
                        </span>
                    </div>
                </div>
            </div>

        {/* Tampilan Harga Desktop & Tablet */}
    <div className="hidden sm:block shrink-0 text-right">
        <span className="font-bold text-slate-900 text-base sm:text-lg">
            {item.quantity}x {formatRupiah(item.product.price)}
        </span>
    </div>
</div>
    )
}