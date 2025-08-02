import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { CartIcon } from '@/components/cart-icon';
import { ShoppingBag, ArrowLeft, ShoppingCart, Star, Package, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    stock: number;
    category?: string;
    created_at: string;
}

interface Props {
    product: Product;
    [key: string]: unknown;
}

export default function ProductShow({ product }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const handleAddToCart = () => {
        setIsAddingToCart(true);
        router.post(route('cart.store'), {
            product_id: product.id,
            quantity: quantity
        }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsAddingToCart(false)
        });
    };

    const maxQuantity = Math.min(product.stock, 10);

    return (
        <>
            <Head title={`${product.name} - ShopSmart`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <Link href={route('home')} className="flex items-center">
                                    <ShoppingBag className="w-8 h-8 text-blue-600 mr-3" />
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        ShopSmart
                                    </h1>
                                </Link>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <Link href={route('products.index')}>
                                    <Button variant="ghost" size="sm">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to Products
                                    </Button>
                                </Link>
                                <CartIcon count={0} />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                            {/* Product Image */}
                            <div className="aspect-square bg-gray-100">
                                {product.image_url ? (
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <ShoppingBag className="w-32 h-32" />
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="p-8">
                                {/* Breadcrumb */}
                                <nav className="text-sm text-gray-500 mb-4">
                                    <Link href={route('home')} className="hover:text-gray-700">
                                        Home
                                    </Link>
                                    <span className="mx-2">/</span>
                                    <Link href={route('products.index')} className="hover:text-gray-700">
                                        Products
                                    </Link>
                                    {product.category && (
                                        <>
                                            <span className="mx-2">/</span>
                                            <Link 
                                                href={route('products.index', { category: product.category })} 
                                                className="hover:text-gray-700"
                                            >
                                                {product.category}
                                            </Link>
                                        </>
                                    )}
                                </nav>

                                {/* Category Badge */}
                                {product.category && (
                                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                                        {product.category}
                                    </span>
                                )}

                                {/* Product Name */}
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    {product.name}
                                </h1>

                                {/* Rating (placeholder) */}
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 ml-2">
                                        (4.8 out of 5 stars)
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-gray-900">
                                        ${product.price}
                                    </span>
                                </div>

                                {/* Description */}
                                {product.description && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            Description
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>
                                )}

                                {/* Stock Status */}
                                <div className="mb-6">
                                    <div className="flex items-center">
                                        <Package className="w-5 h-5 text-gray-400 mr-2" />
                                        <span className={`font-medium ${
                                            product.stock > 10 
                                                ? 'text-green-600' 
                                                : product.stock > 0 
                                                ? 'text-yellow-600' 
                                                : 'text-red-600'
                                        }`}>
                                            {product.stock > 10 
                                                ? 'In Stock' 
                                                : product.stock > 0 
                                                ? `Only ${product.stock} left in stock` 
                                                : 'Out of Stock'
                                            }
                                        </span>
                                    </div>
                                </div>

                                {/* Quantity Selector and Add to Cart */}
                                {product.stock > 0 && (
                                    <div className="mb-6">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                                                Quantity:
                                            </label>
                                            <select
                                                id="quantity"
                                                value={quantity}
                                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                                className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                {[...Array(maxQuantity)].map((_, i) => (
                                                    <option key={i + 1} value={i + 1}>
                                                        {i + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <Button
                                            onClick={handleAddToCart}
                                            disabled={isAddingToCart}
                                            size="lg"
                                            className="w-full sm:w-auto"
                                        >
                                            <ShoppingCart className="w-5 h-5 mr-2" />
                                            {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                                        </Button>
                                    </div>
                                )}

                                {/* Features */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Why choose us?
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <Shield className="w-5 h-5 text-green-500 mr-3" />
                                            <span className="text-gray-600">Secure checkout</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Package className="w-5 h-5 text-blue-500 mr-3" />
                                            <span className="text-gray-600">Fast delivery</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="w-5 h-5 text-yellow-500 mr-3" />
                                            <span className="text-gray-600">Quality guarantee</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}