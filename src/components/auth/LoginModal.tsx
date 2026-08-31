import { useState, FormEvent } from "react";
import { CloseIcon, EyeIcon, EyeOffIcon } from "../../assets/icons/icon";
import { Button } from "../ui/button"

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: () => void;
    onSwitchToRegister?: () => void;
}

export const LoginModal = ({
    isOpen,
    onClose,
    onLoginSuccess,
    onSwitchToRegister,
}: LoginModalProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(email && password) {
            onLoginSuccess();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* 1. OVERLAY HITAM TRANSPARAN (Latar Belakang Tipis) */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity
            "
            onClick={onClose}
            />
                
        {/* 2. CARD MODAL DIALOG */}
        <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 animate-in-fade-in cursor-zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Login</h2>
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                >
                <CloseIcon className="w-6 h-6"/>
                </button>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input Email */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                    Email
                    </label>
                    <input 
                    type="Email" 
                    required
                    placeholder="Input your email"
                    value={email}
                    onChange={(e) => setEmail (e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                </div>

            {/* Input Password + Toggle Eye */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                Password
                </label>
                <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Input your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors pr-11"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                    {showPassword ? (
                        <EyeOffIcon className="w-5 h-6"/>
                    ) : (
                        <EyeIcon className="w-5 h-5"/>
                    )}
                </button>
                </div>
            </div>

        {/* Tombol Login */}
        <div className="pt-2 space-y-3">
            <Button variant="primary" fullWidth type="submit" className="py-3">
                Login
            </Button>

        {/* Link Switch ke Register */}
        <div className="text-center">
            <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
                Register
            </button>
            </div>
        </div>
    </form>
</div>
</div>
    )
}