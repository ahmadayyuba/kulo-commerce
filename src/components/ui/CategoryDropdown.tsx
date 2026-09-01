import { useState, useRef, useEffect } from 'react';
import { GridIcon } from '../../assets/icons/icon';


interface CategoryDropdownProps {
    onSelectCategory?: (category: string | null) => void;
    selectedCategory?: string | null;
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
        <div className='relative inline-block text-left' ref={dropdownRef}>
      {/* Tombol Trigger Category */}
        <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center  px-3 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
            isOpen || selectedCategory
            ? 'border-blue-500 text-blue-600 bg-blue-50/50'
            : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
        }`}
        >
        <GridIcon className="w-5 h-5" />
        <span className="capitalize">
            {selectedCategory}
        </span>
        </button>


      {/* Menu Dropdown Melayang */}
    {isOpen && (
        <div className="absolute left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            {CATEGORIES.map((category) => (
            <button
            key={category}
            onClick={() => handleSelect(category)}
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors capitalize ${
            selectedCategory === category
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
            >
            {category}
            </button>
        ))}
        </div>
    )}
    </div>
);
};




































































































































































































































































'react'