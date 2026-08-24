import { HTMLAttributes } from "react";
import { HtmlTagDescriptor } from "vite";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>{
    count: number ;
    maxCount?: number;
}

export const Badge = ({
    count,
    maxCount = 99,
    className = '',
    ...props
}: BadgeProps) => {
    if (count <= 0 ) return null;
    const displayCount = count > maxCount ? `${maxCount}+` : count;

    return (
        <span
            className={`inline-flex items-center justify-center bg-[#FF2D55] text-white text-[10px] font-bold h-5 min-w-5 px-1 rounded-full border-2 border-white leading-none ${className}`} 
            {...props}
        >
            {displayCount}
        </span>
    );
};