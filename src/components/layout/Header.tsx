import { useEffect, useRef, useState } from 'react';
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
    onLogoutClick?: () => void;
    onRegisterClick?: () => void;
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
    onLogoutClick,
    onRegisterClick,
    onSelectCategory,
    selectedCategory,
    onGoHome,
}: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event?.target as Node)){
                setIsUserDropdownOpen(false);
            }
        };

    document.addEventListener('mousedown', handleClickOutside);
    return () => 
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
            <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

            {/* 1. LOGO */}
            <button
                type="button"
                onClick={onGoHome}
                className="shrink-0 flex items-center text-left focus:outline-none cursor-pointer group"
                aria-label="Go to Home"
            >
            <Logo />
            </button>

                {/* CATEGORY */}
                <div className="hidden md:flex items-center gap-4 flex-1">
                    <CategoryDropdown 
                        onSelectCategory={onSelectCategory}
                        selectedCategory={selectedCategory}
                    />

                    <div className="flex-1">
                        <SearchBar placeholder="Search..." onSearch={onSearch} />
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-4 shrink-0">

                    <CartButton count={cartCount} onClick={onCartClick} />

                    {isLoggedIn ? (
                        <div className="relative" ref={dropdownRef}>

                        <button
                        type="button"
                        onClick={() => setIsUserDropdownOpen((prev) => !prev)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold cursor-pointer hover:bg-slate-100 transition-colors"
                        >
                            <span>{userName}</span>
                            <svg className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`}
                            fill="none" 
                            viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isUserDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 z-50">
                                <button
                                    type="button"
                                    onClick={() =>{
                                        setIsUserDropdownOpen(false);
                                        onLogoutClick?.();
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        )}
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
                    <CategoryDropdown 
                        onSelectCategory={onSelectCategory}
                        selectedCategory={selectedCategory}
                        align="right"
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
                <div className="fixed inset-0 top-0 z-40 bg-white md:hidden p-6 flex flex-col justify-between overflow-y-auto">
                    <div className="space-y-6">

                        <div className= "flex items-center justify-between pb-2 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Menu</h2>
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-1 tect-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                aria-label="Close menu"
                            >
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {/* 2. Menu Items Saat Logged In / Logged Out */}
                        {isLoggedIn ?(
                            <div className="flex flex-row gap-3 items-center justify-between">
                                <div className="p-2 bg-white rounded-2xl border border-slate-200 flex w-52">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5 text-slate-700 shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                        </svg>
                                        <span className="font-semibold text-slate-800 text-sm">
                                            {userName}
                                        </span>
                                    </div>
                                </div>

                                <button 
                                    type="button"
                                    onClick={() =>{
                                        setIsMobileMenuOpen(false);
                                        onLogoutClick?.();
                                    }}
                                    className="w-52 rounded-2xl border border-slate-200 bg-white text-slate-800 font-medium text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center gap-3 p-2"
                                >
                                    <svg
                                        className="w-5 h-5 shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3 flex flex-col gap-3">
                                <Button
                                    variant="secondary"
                                    fullWidth
                                    onClick={onLoginClick}
                                    className="py-3 text-base font-semibold"
                                >
                                    login
                                </Button>
                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={onRegisterClick}
                                    className="py-3 text-base font-semibold"
                                >
                                    Register
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};