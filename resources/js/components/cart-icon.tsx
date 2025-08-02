import React from 'react';
import { router } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';

interface CartIconProps {
    count: number;
}

export function CartIcon({ count }: CartIconProps) {
    const handleClick = () => {
        router.visit(route('cart.index'));
    };

    return (
        <button
            onClick={handleClick}
            className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
            <ShoppingCart className="w-6 h-6" />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </button>
    );
}