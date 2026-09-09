import { useState } from 'react';
import { RadioButton } from './RadioButton';

interface CategoryContentFilterProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
];

export const CategoryContentFilter = ({
    selectedCategory,
    onSelectCategory,
}: CategoryContentFilterProps) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between font-bold text-slate-900 text-base"
            >
            <span>Category</span>
            <svg
                className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
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

        {isOpen && (
            <div className="space-y-3 pt-2 border-t border-slate-100 flex flex-col">
                {CATEGORIES.map((category) => (
                <RadioButton
                    key={category}
                    name="category-filter"
                    label={category}
                    checked={selectedCategory.toLowerCase() === category.toLowerCase()}
                    onChange={() => onSelectCategory(category)}
                    className="capitalize"
                />
                ))}
            </div>
            )}
        </div>
    );
};