import { useState, FormEvent } from "react";
import { CloseIcon, EyeIcon, EyeOffIcon } from "../../assets/icons/icon";
import { Button } from "../ui/button";
import { supabase } from "../../lib/supabase";

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
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successNotice, setSuccessNotice] = useState<string | null>(null); // State untuk pesan cek email

    if (!isOpen) return null;

    // Handler Pendaftaran Manual via Email & Password
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);
        setSuccessNotice(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
            },
        });

        setLoading(false);

        if (error) {
            setErrorMsg(error.message);
            return;
        }

        // Tampilkan pemberitahuan UI agar user mengecek email mereka
        setSuccessNotice("Registrasi berhasil! Silakan cek kotak masuk (inbox/spam) email Anda untuk verifikasi akun.");
        
        // Opsional: delay sebentar sebelum menutup modal atau biarkan user membaca pesan
        setTimeout(() => {
            onRegisterSuccess();
        }, 4000);
    };

    // Handler Login / Register kilat via Google OAuth
    const handleGoogleLogin = async () => {
        setErrorMsg(null);
        setLoading(true);
        
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin, // Mengarahkan kembali ke website setelah login google sukses
            },
        });

        if (error) {
            setLoading(false);
            setErrorMsg(error.message);
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
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                    >
                        <CloseIcon className="w-6 h-6"/>
                    </button>
                </div>

                {/* Kotak Pesan Error */}
                {errorMsg && (
                    <div className="p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl border border-red-200">
                        {errorMsg}
                    </div>
                )}

                {/* Kotak Pesan Pemberitahuan Cek Email */}
                {successNotice && (
                    <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl border border-emerald-200">
                        {successNotice}
                    </div>
                )}

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
                                className="w-full px-4 py-3 rounded-2xl border border-slate-100 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors pr-11"
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

                    <div className="pt-2 space-y-3">
                        <Button variant="primary" fullWidth type="submit" disabled={loading} className="py-3">
                            {loading ? 'Creating account...' : 'Register'}
                        </Button>

                        {/* Garis Pembatas / Divider */}
                        <div className="flex items-center my-3">
                            <div className="flex-grow border-t border-slate-200"></div>
                            <span className="px-3 text-xs text-slate-400 font-medium">Or continue with</span>
                            <div className="flex-grow border-t border-slate-200"></div>
                        </div>

                        {/* Tombol Google OAuth */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 font-semibold text-sm shadow-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.14C3.16 21.32 7.23 24 12 24z"/>
                                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.62H1.18C.43 8.13 0 9.83 0 12s.43 3.87 1.18 5.38l4.09-3.14z"/>
                                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.16 2.68 1.18 6.62l4.09 3.14c.95-2.85 3.6-4.96 6.73-4.96z"/>
                            </svg>
                            Sign up with Google
                        </button>

                        <div className="text-center pt-2">
                            <span className="text-xs text-slate-500">Already have an account? </span>
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