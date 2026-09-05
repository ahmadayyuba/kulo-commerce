import { useState, useRef, useEffect } from 'react';
import { GridIcon } from '../../assets/icons/icon';


interface CategoryDropdownProps {
    onSelectCategory?: (category: string | null) => void;
    selectedCategory?: string | null;

    label?: string;
    align?: 'left' | 'right';
}

const CATEGORIES = [
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
];

export const CategoryDropdown = ({
    onSelectCategory,
    selectedCategory,
    label = 'Category',
    align = 'left',
}: CategoryDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

  // Otomatis tutup dropdown jika diklik di luar area menu
    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
        ) {
        setIsOpen(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);

    const handleSelect = (category: string) => {
        if (onSelectCategory) {
        onSelectCategory(selectedCategory === category ? null : category);
    }
    setIsOpen(false);
    };

    return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Tombol Trigger Category */}
        <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2.5 px-3 py-3 rounded-full   border text-sm font-semibold transition-all duration-200 select-none ${
                isOpen || selectedCategory
            ? ' bg-blue-50/60 shadow-sm ring-2 ring-blue-500/10'
            : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300'
            }`}
        >
            <GridIcon className="w-4 h-4 shrink-0 text-current" />
        
        {/* SELALU MENAMPILKAN TEKS "Category" */}
        <span className='hidden lg:block'>{label}</span>

        {/* Chevron Arrow Indicator */}
        <svg
            className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-400 hidden lg:block ${
                isOpen ? 'rotate-180 text-blue-600' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
        />
        </svg>
    </button>


    {/* Menu Dropdown Melayang */}
    {isOpen && (
        <div
        className={`absolute mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
            align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
        }`}
        >
        <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Select Category
        </div>
        {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
            <button
                key={category}
                type="button"
                onClick={() => handleSelect(category)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors capitalize ${
                isSelected
                    ? 'bg-blue-50/80 text-blue-600 font-bold'
                    : 'text-slate-700 hover:bg-slate-50 font-medium'
                }`}
            >
                <span>{category}</span>
                {isSelected && (
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                )}
                </button>
                );
            } )}
        </div>
        )}
    </div>
  );
};




































































































































































































































































'react'