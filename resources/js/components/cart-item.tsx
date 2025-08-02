import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    image_url?: string;
    stock: number;
}

interface CartItemData {
    id: number;
    product: Product;
    quantity: number;
    price: number;
}

interface CartItemProps {
    item: CartItemData;
}

export function CartItem({ item }: CartItemProps) {
    const [isUpdating, setIsUpdating] = useState(false);

    const updateQuantity = (newQuantity: number) => {
        if (newQuantity < 1 || newQuantity > item.product.stock) return;
        
        setIsUpdating(true);
        router.patch(route('cart.update', item.id), {
            quantity: newQuantity
        }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsUpdating(false)
        });
    };

    const removeItem = () => {
        if (confirm('Remove this item from your cart?')) {
            router.delete(route('cart.destroy', item.id), {
                preserveState: true,
                preserveScroll: true
            });
        }
    };

    const subtotal = item.price * item.quantity;

    return (
        <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.product.image_url ? (
                    <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4z" />
                        </svg>
                    </div>
                )}
            </div>
            
            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                    {item.product.name}
                </h3>
                <p className="text-sm text-gray-500">
                    ${item.price} each
                </p>
            </div>
            
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.quantity - 1)}
                    disabled={item.quantity <= 1 || isUpdating}
                    className="w-8 h-8 p-0"
                >
                    <Minus className="w-4 h-4" />
                </Button>
                
                <span className="w-8 text-center font-medium">
                    {item.quantity}
                </span>
                
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock || isUpdating}
                    className="w-8 h-8 p-0"
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </div>
            
            <div className="text-right">
                <div className="font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeItem}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}