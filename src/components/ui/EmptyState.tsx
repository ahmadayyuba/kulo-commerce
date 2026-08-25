import { ReactNode } from 'react';
import { Button } from './button';

interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export const EmptyState = ({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    className = '',
}: EmptyStateProps) => {
return (
    <div className={`flex flex-col items-center justify-center text-center p-8 space-y-4 max-w-md mx-auto ${className}`}>
      {/* Ilustrasi Gambar / SVG */}
        <div className="w-32 h-32 flex items-center justify-center">
        {icon}
    </div>

    {/* Teks Judul & Deskripsi */}
    <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
    </div>
    {actionLabel && onAction && (
        <div className="pt-2">
            <Button variant="primary" onClick={onAction}>
            {actionLabel}
            </Button>
        </div>
    )}
    </div>
);
};