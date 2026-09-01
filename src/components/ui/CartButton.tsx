import { ShoppingCartIcon } from "../../assets/icons/icon";
import { Badge } from "./Badge";

interface CartButtonProps {
    count?: number;
    onClick?: () => void;
    className?: string;
}

export const CartButton = ({
    count = 0,
    onClick,
    className = '',
}: CartButtonProps) => {
    return(
        <button
            type="button"
            onClick={onClick}
            className={`relative inline-flex items-center justify-center p-2 rounded-full text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none border border-slate-200  ${className}`}
            aria-label="Keranjang Belanja"
        >
        <ShoppingCartIcon className="w-6 h-6"/>

        <div className="absolute -top-0.5 -right-0.5">
            <Badge count={count}/>
        </div>
        </button>
    );
};