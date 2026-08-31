import { useState, FormEvent } from "react";
import { CloseIcon, EyeIcon, EyeOffIcon } from "../../assets/icons/icon";
import { Button } from "../ui/button";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegisterSuccess: () => void;
    onSwitchToLogin?: () => void;
}

export const RegisterModal = ({
    isOpen,
    onClose,
    onRegisterSuccess,
    onSwitchToLogin,
}: RegisterModalProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (name && email && password) {
        onRegisterSuccess();
        onClose();
    }
};

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* 1. OVERLAY HITAM TRANSPARAN */}
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity"
            onClick={onClose}
        />
        {/* 2. CARD MODAL DIALOG */}
        <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900"> 
                    Register
                </h2>
                <button 
                type="button"
                onClick={onClose}
                className="P-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                >
                    <CloseIcon className="w-6 h-6"/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Name */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                    Name
                </label>
                <input 
                type="text" 
                required
                placeholder="Input your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                </div>

            {/* Input Email */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                    Email
                </label>
                <input 
                type="email" 
                required
                placeholder="Input your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
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
                    placeholder="Input Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-100 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colorspr-11"
                    />
                    <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                    {showPassword ? (
                        <EyeOffIcon className="w-5 h-5"/>
                    ) : (
                        <EyeIcon className="w-5 h-5"/>
                    )}
                    </button>
                </div>
            </div>

            {/* Tombol Register */}
            <div className="pt-2 space-y-3">
                <Button variant="primary" fullWidth type="submit" className="py-3">
                Register
                </Button>

            {/* Link Switch ke Login */}
            <div className="text-center">
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                Login
                </button>
            </div>
            </div>
        </form>
    </div>
</div>
);
};