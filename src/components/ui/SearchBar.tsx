import { useState, ChangeEvent, FormEvent } from 'react';
import { SearchIcon, CloseIcon } from '../../assets/icons/icon';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    className?: string;
}

export const SearchBar = ({
    placeholder = 'Search',
    onSearch,
    className = '',
}: SearchBarProps) => {
    const [query, setQuery] = useState('');

  // 1. Ketikan HANYA menyimpan state internal (tidak panggil onSearch secara real-time)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    };

    const handleClear = () => {
    setQuery('');
        if (onSearch) onSearch(''); // Reset pencarian saat diklik silang
    };

  // 2. Pencarian BARU BERJALAN saat Form di-submit (Tekan Enter atau Klik Icon Search)
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    if (onSearch) onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className={`relative flex items-center w-full ${className}`}>
        {/* Icon Search sekaligus Button Submit (Kiri) */}
            <button
                type="submit"
                aria-label="Submit Search"
                className="absolute left-3.5 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors z-10"
            >
                <SearchIcon className="w-5 h-5" />
            </button>

        {/* Input Text */}
        <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2.5 bg-white text-slate-800 placeholder-slate-400 border border-slate-200 rounded-full text-sm transition-all focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
        />    

        {/* Icon Clear / Close (Kanan) */}
        {query && (
            <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 flex items-center justify-center p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
            >
                <CloseIcon className="w-4 h-4" />
            </button>
            )}
        </form>
    );
};