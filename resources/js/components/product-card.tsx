import React from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    stock: number;
    category?: string;
}

interface ProductCardProps {
    product: Product;
    showAddToCart?: boolean;
}

export function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
    const handleAddToCart = () => {
        router.post(route('cart.store'), {
            product_id: product.id,
            quantity: 1
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleViewProduct = () => {
        router.visit(route('products.show', product.id));
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-square overflow-hidden bg-gray-100">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4z" />
                        </svg>
                    </div>
                )}
            </div>
            
            <div className="p-4">
                <div className="mb-2">
                    {product.category && (
                        <span className="text-sm text-gray-500 font-medium">
                            {product.category}
                        </span>
                    )}
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                </h3>
                
                {product.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                    </p>
                )}
                
                <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                        Stock: {product.stock}
                    </span>
                </div>
                
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleViewProduct}
                        className="flex-1"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                    </Button>
                    
                    {showAddToCart && product.stock > 0 && (
                        <Button
                            onClick={handleAddToCart}
                            size="sm"
                            className="flex-1"
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                        </Button>
                    )}
                    
                    {product.stock === 0 && (
                        <Button disabled size="sm" className="flex-1">
                            Out of Stock
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}