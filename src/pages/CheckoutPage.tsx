import { useState } from 'react';
import { CartItem } from "../types/cart";
import { PaymentModal } from "../pages/PaymentModal.tsx"; // Sesuaikan path import foldermu

interface CheckoutPageProps {
    checkoutItems: CartItem[];
    onSelectPayment: () => void;
}

export const CheckoutPage = ({
    checkoutItems,
}: CheckoutPageProps) => {
    // 1. Tambahkan state untuk mengontrol modal dan bank yang dipilih
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBank, setSelectedBank] = useState<string | null>(null);

    const totalItems = checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = checkoutItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return(
        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Checkout
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {checkoutItems.map((item) => (
                        <div
                            key={item.product.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-slate-200"
                        >
                            <div className="flex items-start gap-4 sm:gap-6">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white p-2 rounded-xl border border-slate-100 flex-shrink-0 flex items-center justify-center">
                                    <img 
                                    src={item.product.image}
                                    alt={item.product.title || item.product.name}
                                    className="max-w-full max-h-full object-contain"
                                    />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-slate-800 text-sm sm:text-base line-clamp-2">
                                            {item.product.title || item.product.name}
                                        </h3>
                                        <p className="text-slate-500 text-xs sm:text-sm capitalize">
                                            {item.product.category}
                                        </p>
                                {/* HARGA PER ITEM */}
                                <div className="flex justify-between sm:justify-end items-center sm:min-w-[120px]">
                                    <span className="font-medium text-slate-800 text-sm sm:text-base">
                                    {item.quantity}x ${item.product.price.toFixed(2)}
                                    </span>
                                </div>
                                </div>
                                </div>
                        </div>
                    ))}
                </div>

                {/* BAGIAN KANAN: Ringkasan Total */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm sticky top-24 space-y-6">
                        <h2 className="text-lg font-bold text-slate-900">
                            Total Shopping
                        </h2>

                        <div className="space-y-4">
                            <div className="flex justify-between text-slate-600 text-sm">
                                <span>Total Price({totalItems})</span>
                                <span className="font-semibold text-slate-900">
                                    ${totalPrice.toFixed(2)}
                                </span>
                            </div>

                            <hr className="border-slate-100 border-dashed"/>

                            <div className="flex justify-between items-center">
                                <span className="font-medium text-slate-800">
                                    Total Shopping
                                </span>
                                <span className="text-lg font-bold text-slate-900">
                                ${totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors mt-4"
                        >   
                            Select Payment Method
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. TEMPELKAN PAYMENT MODAL DI SINI (SEBELUM </main>) */}
            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                totalPrice={totalPrice}
                selectedBank={selectedBank}
                onSelectBank={(bankId) => setSelectedBank(bankId)}
                onPay={() => {
                    alert(`Pembayaran menggunakan ${selectedBank} berhasil diproses!`);
                    setIsModalOpen(false);
                }}
            />
        </main>
    );
};