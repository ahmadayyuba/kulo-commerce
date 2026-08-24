import { useState, ChangeEvent, FormEvent } from 'react';
import { SearchIcon, CloseIcon } from '../../assets/icons/icon'; // Sesuaikan path icon kamu

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

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
};

const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
};

const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
};

return (
    <form onSubmit={handleSubmit} className={`relative flex items-center w-full ${className}`}>
      {/* Icon Search (Kiri) */}
    <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
        <SearchIcon className="w-5 h-5" />
    </div>

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
            className="absolute right-3 flex items-center justify-center p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
        <CloseIcon className="w-4 h-4" />
        </button>
    )}
    </form>
    );
};