import { useState } from 'react';
import { Logo } from '../ui/Logo';
import { SearchBar } from '../ui/SearchBar';
import { CartButton } from '../ui/CartButton';
import { Button } from '../ui/button';
import { MenuHamburgerIcon, CloseIcon } from '../../assets/icons/icon';
import { CategoryDropdown } from '../ui/CategoryDropdown';

interface HeaderProps {
    cartCount?: number;
    isLoggedIn?: boolean;
    userName?: string;
    onSearch?: (value: string) => void;
    onCartClick?: () => void;
    onLoginClick?: () => void;
    onRegisterClick?: () => void;
    // ✅ 1. Tambahkan Prop Filter Kategori
    onSelectCategory?: (category: string | null) => void;
    selectedCategory?: string | null;
    onGoHome?: () => void;
}

export const Header = ({
    cartCount = 0,
    isLoggedIn = false,
    userName = 'John Doe',
    onSearch,
    onCartClick,
    onLoginClick,
    onRegisterClick,
    onSelectCategory,
    selectedCategory,
    onGoHome,
}: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
            <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

            {/* 1. LOGO DENGAN INTERAKSI GO HOME */}
            <button
                type="button"
                onClick={onGoHome}
                className="shrink-0 flex items-center text-left focus:outline-none cursor-pointer group"
                aria-label="Go to Home"
            >
            <Logo />
            </button>

                {/* CATEGORY + SEARCH (Desktop/Tablet) */}
                <div className="hidden md:flex items-center gap-4 flex-1">
                    {/* ✅ 2. GANTI BUTTON STATIS DENGAN CATEGORY DROPDOWN */}
                    <CategoryDropdown 
                        onSelectCategory={onSelectCategory}
                        selectedCategory={selectedCategory}
                    />

                    <div className="flex-1">
                        <SearchBar placeholder="Search..." onSearch={onSearch} />
                    </div>
                </div>

                {/* RIGHT SIDE ACTIONS (Desktop/Tablet) */}
                <div className="hidden md:flex items-center gap-4 shrink-0">
                    <CartButton count={cartCount} onClick={onCartClick} />
                    {isLoggedIn ? (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold cursor-pointer hover:bg-slate-100 transition-colors">
                            <span>{userName}</span>
                            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2.5">
                            <Button variant="secondary" onClick={onLoginClick}>Login</Button>
                            <Button variant="primary" onClick={onRegisterClick}>Register</Button>
                        </div>
                    )}
                </div>

                {/* MOBILE ACTION ICONS */}
                <div
                    className={`flex-1 md:hidden flex items-center justify-between gap-2 transition-all duration-300 ease-out
                        ${isMobileSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 shrink-0">
                    {/* ✅ 3. PASANG DROPDOWN JUGA DI MOBILE ACTION */}
                    <CategoryDropdown 
                        onSelectCategory={onSelectCategory}
                        selectedCategory={selectedCategory}
                    />

                    <button
                        type="button"
                        onClick={() => {
                            setIsMobileSearchOpen(true);
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
                        aria-label="Search"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    <div className="flex items-center shrink-0">
                        <CartButton count={cartCount} onClick={onCartClick} />
                    </div>
                    </div>

                    <div>
                    <button
                        type="button"
                        onClick={() => {
                            setIsMobileMenuOpen((prev) => !prev);
                            setIsMobileSearchOpen(false);
                        }}
                        className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-xl focus:outline-none shrink-0 ml-auto"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuHamburgerIcon className="w-6 h-6" />}
                    </button>
                    </div>
                </div>

                {/* MOBILE SEARCH OVERLAY */}
                <div
                    className={`absolute inset-0 md:hidden flex items-center gap-2 bg-white px-4 transition-all duration-300 ease-out z-10
                        ${isMobileSearchOpen
                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                >
                    <div className="flex-1">
                        <SearchBar placeholder="Search" onSearch={onSearch} />
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsMobileSearchOpen(false)}
                        className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-full shrink-0"
                        aria-label="Close search"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* MOBILE MENU FULL-SCREEN OVERLAY */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-20 z-40 bg-white md:hidden p-6 flex flex-col justify-between overflow-y-auto">
                    <div className="space-y-6">
                        <div className="text-2xl font-bold text-slate-900">Menu</div>
                        {isLoggedIn ? (
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                                <span className="font-semibold text-slate-800">{userName}</span>
                                <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-full">Aktif</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Button variant="secondary" fullWidth onClick={onLoginClick} className="py-3 text-base font-semibold">Login</Button>
                                <Button variant="primary" fullWidth onClick={onRegisterClick} className="py-3 text-base font-semibold">Register</Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};