import {Checkbox} from './Checkbox'
import {Quantity} from './Quantity'
import { TrashIcon } from '../../assets/icons/icon'
import { CartItemType } from '../../types/product'

interface CartItemProps {
    item: CartItemType;
    onSelectChange?: (selected: boolean) => void;
    onQuantityChange?: (quantity: number) => void;
    onRemove?: () => void;
    className?: string;
}

export const CartItem = ({
    item,
    onSelectChange,
    onQuantityChange,
    onRemove,
    className = '',
}: CartItemProps) => {
    const formatRupiah = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
}; 

    return (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 gap-4`}>
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <Checkbox
                    checked={item.selected}
                    onChange={(e) => onSelectChange?.(e.target.checked)}
                />

                {/* Gambar Produk */}
                <div className='w-16 h-16 sm:w-2- sm:h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center'>
                {item.product.image ?(
                    <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cove"
                    />
                ) : (
                    <span className="text-[10px] text-slate-400">
                        No Image
                    </span>
                )}
                </div>

                {/* Nama & Kategori Produk */}

                <div className="flex flex-col min-w-0">
                    <h3 className='font-semibold text-slate-800 text-sm sm:text-base truncate'>
                        {item.product.name}
                    </h3>
                    <span className="text-xs text-slate-400 mt-0.5">
                        {item.product.category || 'Uncategorized'}
                    </span>
                </div>
            </div>

      {/* Sisi Kanan: Harga, Tombol Hapus & Quantity */}
    <div className="flex flex-col sm:items-end justify-between gap-3 shrink-0">
        {/* Total Harga Produk x Quantity */}
        <span className="font-bold text-slate-900 text-base sm:text-lg self-end sm:self-auto">
          {formatRupiah(item.product.price * item.quantity)}
        </span>

        {/* Action Controls (Trash Icon + Quantity) */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Tombol Hapus */}
        <button
            type="button"
            onClick={onRemove}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors focus:outline-none"
            aria-label="Hapus produk"
        >
            <TrashIcon className="w-5 h-5" />
        </button>

          {/* Stepper Quantity */}
            <Quantity
            value={item.quantity}
            onChange={(val) => onQuantityChange?.(val)}
            min={1}
            max={99}
            />
        </div>
    </div>
</div>
);
};