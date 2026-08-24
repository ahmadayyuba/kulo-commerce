import { InputHTMLAttributes, useState } from "react";
import { EyeIcon, EyeOffIcon } from "../../assets/icons/icon";

interface InputFeildProps extends
InputHTMLAttributes<HTMLInputElement>{
    label?: string;
    error?: string;
    helperText?: string;
}

export const InputFeild = ({
    label,
    error,
    helperText,
    type = 'text',
    className ='',
    disabled,
    ...props
}: InputFeildProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword  ? 'text' : 'password') : type;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}

      {/* Input Container */}
        <div className="relative flex items-center w-full">
            <input
                type={inputType}
                disabled={disabled}
                className={`w-full px-3.5 py-2.5 bg-white text-slate-800 placeholder-slate-400 text-sm border rounded-lg transition-all outline-none 
                ${error ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500'}
                ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''}
                ${isPassword ? 'pr-10' : ''}
                ${className}`}
                {...props}
            />
    {/* Toggle Show/Hide Password Icon */}
    {isPassword && (
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none"
        >
            {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
        </button>
        )}
    </div>

      {/* Helper Text / Error Message */}
    {error ? (
        <span className="text-xs text-red-500 font-medium">{error}</span>
    ) : helperText ? (
        <span className="text-xs text-slate-500">{helperText}</span>
    ) : null}
    </div>
 );
};