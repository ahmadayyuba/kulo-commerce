import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
    isLoading?: boolean;
}

export const Button = ({
variant = 'primary',
fullWidth = false,
isLoading = false,
disabled,
children,
className = '',
...props
}: ButtonProps) => {

const baseStyles = 
    'inline-flex items-center justify-center font-semibold text-sm px-4 py-2.5 rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

const variantStyles = variant === 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-900 active:bg-blue-800 focus:ring-bg-blue-500' // <- isi sendiri styling primary
    : 'bg-white text-black hover:bg-slate-200 active:bg-slate-200 border border-slate-200'; // <- isi sendiri styling secondary

const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles} ${widthStyle} ${className}`}
        {...props}
    >
        {isLoading ? (
        <div className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
        </div>
    ) : (
        children
    )}
    </button>
);
};