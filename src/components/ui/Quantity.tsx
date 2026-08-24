import { minify } from "vite";
import { MinusIcon, PlusIcon } from "../../assets/icons/icon";

interface QuantityProps {
    value: number;
    onChange: (newValue: number) => void;
    min?: number;
    max?: number;
    disabled?: boolean;
    className?: string;
}

export const Quantity= ({
    value,
    onChange,
    min = 1,
    max = 99,
    disabled = false,
    className = '',
}: QuantityProps) => {
    const handleDecrement = () => {
        if (value > min && !disabled){
            onChange(value - 1);
        }
    };
    
    const handleIncrement = () => {
        if (value < max && !disabled){
            onChange(value + 1);
        }
    };

    return (
        <div 
        className={`inline-flex items-center justify-between border border-slate-200 bg-white rounded-full p-1.5 shadow-sm min-w-[120px] ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`}
        >
        
        <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || value <= min}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus:outline-none"
            aria-label="Kurangi Jumlah"
        >
            <MinusIcon className="w-4 h-4"/>
        </button>

        <span className="font-semibold text-slate-800 text-sm px-3 select-none">
            {value}
        </span>

        <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || value >= max}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus:outline-none"
            aria-label="Tambah Jumlah"
        >
            <PlusIcon className="w-4 h-4"/>
        </button>
        </div>
    );
};