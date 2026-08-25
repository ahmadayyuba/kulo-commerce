import { InputHTMLAttributes } from 'react';

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: boolean;
}

export const RadioButton = ({
    label,
    error = false,
    disabled = false,
    className = '',
...props
}: RadioButtonProps) => {
return (
    <label className={`inline-flex items-center gap-2.5 cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
    <div className="relative flex items-center justify-center">
        {/* Native Radio (Hidden) */}
        <input
            type="radio"
            disabled={disabled}
            className="peer sr-only"
            {...props}
        />
        
        {/* Custom Outer Circle */}
        <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center bg-white
        ${error 
            ? 'border-red-500 peer-checked:border-red-500' 
            : 'border-slate-300 peer-checked:border-blue-600'
        }
        peer-focus:ring-2 peer-focus:ring-blue-100
        `} />

        {/* Custom Inner Dot (Checked State) */}
    <div className={`absolute w-2.5 h-2.5 rounded-full transition-transform scale-0 peer-checked:scale-100
        ${error ? 'bg-red-500' : 'bg-blue-600'}
        `} />
    </div>

      {/* Label Text */}
    {label && (
        <span className={`text-sm select-none ${disabled ? 'text-slate-400' : error ? 'text-red-500' : 'text-slate-700'}`}>
            {label}
        </span>
        )}
    </label>
    );
};