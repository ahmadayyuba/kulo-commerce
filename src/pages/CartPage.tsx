import { useEffect, useState } from 'react';
import { CartItem } from '../types/cart';
import { Button } from '../components/ui/button';
import { TrashIcon } from '../assets/icons/icon';
import { EmptyCartIllustration } from '../components/illustrations/EmptyIllustrations';

interface CartPageProps {
    cartItems: CartItem[];
    onUpdateQuantity: (productId: number, amount: number) => void;
    onRemoveItem: (productId: number) => void;
    onContinueShopping: () => void;
    onCheckout: () => void;
}

export const CartPage = ({
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
    onContinueShopping,
    onCheckout,
}: CartPageProps) => {

    const [selectedIds, setSelectedIds] = useState<Set<number>>(
        () => new Set(cartItems.map((item) => item.product.id))
    );
    useEffect(() => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            cartItems.forEach((item) => {
                if (!next.has(item.product.id)) {
                    next.add(item.product.id);
                }
            });
            return next;
        });
    }, [cartItems]);

    const isAllSelected =
        cartItems.length > 0 && selectedIds.size === cartItems.length;

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(cartItems.map((item) => item.product.id)));
        }
    };

    const toggleSelectItem = (productId: number) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(productId)) {
                next.delete(productId);
            } else {
                next.add(productId);
            }
            return next;
        });
    };

    const totalPrice = cartItems.reduce(
        (sum, item) =>
            selectedIds.has(item.product.id)
                ? sum + item.product.price * item.quantity
                : sum,
        0
    );

    if (cartItems.length === 0) {
        return (
            <div className="max-w-[1280px] mx-auto px-4 py-16 text-center">

                <EmptyCartIllustration className="mx-auto mb-4"/>
                
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Your cart is empty
                </h2>
                <p className="text-slate-500 mb-6">
                    Looks like you haven't added any products to your cart yet. Start exploring our products and add your favorites to the cart!
                </p>
                <Button variant="primary" onClick={onContinueShopping}>
                    Continue Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-[1280px] mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
                Cart
            </h1>

            {/* SELECT ALL */}
            <label className="flex items-center gap-2 mb-4 cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="w-5 h-5 rounded border-slate-300 accent-blue-600"
                />
                <span className="text-sm font-medium text-slate-700">
                    Select All
                </span>
            </label>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* KOLOM KIRI: DAFTAR ITEM KERANJANG */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map(({ product, quantity }) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl p-4 border border-slate-200 flex gap-3 items-start"
                        >
                            <input
                                type="checkbox"
                                checked={selectedIds.has(product.id)}
                                onChange={() => toggleSelectItem(product.id)}
                                className="w-5 h-5 mt-1 rounded border-slate-300 accent-blue-600 shrink-0"
                            />

                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 object-contain rounded-xl bg-slate-100 p-2 shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-slate-800 mb-0.5">
                                    {product.name}
                                </h3>
                                {product.category && (
                                    <p className="text-xs text-slate-400 capitalize mb-2">
                                        {product.category}
                                    </p>
                                )}

                                {/* BARIS KEDUA: harga, hapus, quantity */}
                                <div className="flex items-center justify-between">
                                    <span className="text-base font-bold text-slate-900">
                                        ${product.price}
                                    </span>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => onRemoveItem(product.id)}
                                            aria-label={`Remove ${product.name} from cart`}
                                            className="text-slate-400 hover:text-red-500"
                                        >
                                            <TrashIcon />
                                        </button>

                                        <div className="flex items-center gap-2 border border-slate-200 rounded-full px-1">
                                            <button
                                                type="button"
                                                onClick={() => onUpdateQuantity(product.id, -1)}
                                                className="w-6 h-6 flex items-center justify-center font-bold text-slate-600"
                                            >
                                                -
                                            </button>
                                            <span className="w-5 text-center font-semibold text-sm">
                                                {quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => onUpdateQuantity(product.id, 1)}
                                                className="w-6 h-6 flex items-center justify-center font-bold text-slate-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* KOLOM KANAN: TOTAL SHOPPING (sticky di desktop) */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 lg:sticky lg:top-24">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">
                            Total Shopping
                        </h2>

                        <div className="flex justify-between text-sm text-slate-600 mb-6">
                            <span>Total</span>
                            <span className="font-bold text-slate-900">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>

                        <Button 
                        variant="primary" 
                        fullWidth
                        onClick={onCheckout}
                        className="py-3 text-base font-semibold rounded-full">
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};