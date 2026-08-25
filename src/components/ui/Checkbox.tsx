import { InputHTMLAttributes } from "react"; 

interface CheckboxProps extends
InputHTMLAttributes<HTMLInputElement>{
    label?: string;
}

export const Checkbox = ({
    label,
    disabled = false,
    className = '',
    ...props
}: CheckboxProps) => {
    return (
        <label className={`inline-flex items-center gap-2.5 cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
            <div className="relative flex items-center justify-center">
                <input 
                type="checkbox"
                disabled={disabled}
                className="peer sr-only"
                {...props}
                />


        {/* Custom Box */}
        <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-focus:ring-2 peer-focus:ring-blue-100 disabled:bg-slate-100" />

        {/* Custom Checkmark Icon */}
        <svg
            className="absolute w-3.5 h-3.5 text-white transition-transform scale-0 peer-checked:scale-100 pointer-events-none"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
        <path
            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        </svg>
        </div>

        {/* Label Text */}
        {label && (
        <span className={`text-sm select-none ${disabled ? 'text-slate-400' : 'text-slate-700'}`}>
        {label}
        </span>
    )}
    </label>
);
};