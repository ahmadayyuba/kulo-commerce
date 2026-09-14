import React from "react";
import { div } from "framer-motion/client";
import { BniLogo, BriLogo, BtnLogo, MandiriLogo, BcaLogo } from '../components/ui/BankLogo'; 

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalPrice: number;
    selectedBank: string | null;
    onSelectBank: (bankId: string) => void;
    onPay: () => void;
}


const banks = [
    { id: 'bni', name: 'Bank Negara Indonesia', logo: <BniLogo className="w-10 h-10" /> },
    { id: 'bri', name: 'Bank Rakyat Indonesia', logo: <BriLogo className="w-10 h-10" /> },
    { id: 'mandiri', name: 'Bank Mandiri', logo: <MandiriLogo className="w-10 h-10" /> },
    { id: 'bca', name: 'Bank Central Asia', logo: <BcaLogo className="w-10 h-10" /> },
    { id: 'btn', name: 'Bank Tabungan Negara', logo: <BtnLogo className="w-10 h-10" /> },
];

export const PaymentModal: React.FC<PaymentModalProps> = ({
    isOpen,
    onClose,
    totalPrice,
    selectedBank,
    onSelectBank,
    onPay,
}) => {
    if (!isOpen) return null;

    return(     
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        {/* 2. Container Putih Modal */}
        <div className="bg-white w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Header Modal & Tombol Close (X) */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">
                    Select Payment
                </h2>
                <button
                onClick={onClose}
                className="text-slate-400 text-xl hover:text-slate-600 font-bold"
                >
                    &times;
                </button>
            </div>


                {/* List Bank */}
                <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
                    {banks.map((bank) => {
                        const isSelected = selectedBank === bank.id;
                        return (
                            <div
                                key={bank.id}
                                onClick={() => onSelectBank(bank.id)}
                                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                                    isSelected 
                                        ? 'border-blue-500 bg-blue-50/30' 
                                        : 'border-slate-200 hover:border-slate-300'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Memanggil Logo Bank */}
                                    <div className="flex-shrink-0">
                                        {bank.logo}
                                    </div>
                                    <span className="font-medium text-slate-800 text-sm sm:text-base">
                                        {bank.name}
                                    </span>
                                </div>
                                <input
                                    type="radio"
                                    name="payment-bank"
                                    checked={isSelected}
                                    onChange={() => onSelectBank(bank.id)}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                />
                            </div>
                        );
                    })}
                </div>

            {/* Footer Modal: Total Belanja & Tombol Pay */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                    <div>
                        <p className="text-xs text-slate-500 font-medium">Total Price</p>
                        <p className="text-xl font-bold text-slate-900">
                            ${totalPrice.toFixed(2)}
                        </p>
                    </div>
                    <button
                        onClick={onPay}
                        disabled={!selectedBank}
                        className={`px-8 py-3 rounded-xl font-semibold text-white transition-colors ${
                            selectedBank 
                                ? 'bg-blue-600 hover:bg-blue-700' 
                                : 'bg-blue-300 cursor-not-allowed'
                        }`}
                    >
                        Pay
                    </button>
            </div>
        </div>
    </div>
    );
};