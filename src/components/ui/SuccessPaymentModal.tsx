import React from "react";

interface SuccessPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBackToHome: () => void;
}

export const SuccesPaymentModal: React.FC<SuccessPaymentModalProps> = ({
    isOpen,
    onClose,
    onBackToHome,
}) => {
    if (!isOpen) return null;
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200 p-6 text-center relative">
                {/* Tombol Close (X) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-xl"
                >
                    &times;
                </button>
                {/* Icon Checklingkaran Hijau */}
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4 text-emerald-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>

                </div>
                {/* Teks Informasi */}
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                    Payment Successful!
                </h2>
                <p className="text-sm text-slate-500 mb-6">Thank you for shopping at our store</p>

                {/* Tombol Back to Home */}
                <button
                    onClick={onBackToHome}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};