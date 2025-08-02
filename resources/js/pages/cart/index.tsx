import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { CartItem } from '@/components/cart-item';
import { CartIcon } from '@/components/cart-icon';
import { ShoppingBag, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface Props {
    cartItems: CartItemData[];
    total: number;
    itemCount: number;
    [key: string]: unknown;
}

export default function CartIndex({ cartItems, total, itemCount }: Props) {
    return (
        <>
            <Head title="Shopping Cart - ShopSmart" />
            
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
                                        Continue Shopping
                                    </Button>
                                </Link>
                                <CartIcon count={itemCount} />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Shopping Cart
                        </h1>
                        <p className="text-gray-600">
                            {itemCount > 0 ? `${itemCount} item${itemCount !== 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
                        </p>
                    </div>

                    {cartItems.length > 0 ? (
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {/* Cart Items */}
                            <div className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="p-6">
                                        <CartItem item={item} />
                                    </div>
                                ))}
                            </div>

                            {/* Cart Summary */}
                            <div className="bg-gray-50 p-6 border-t">
                                <div className="flex items-center justify-between text-lg font-medium text-gray-900 mb-4">
                                    <span>Total:</span>
                                    <span className="text-2xl font-bold">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                                
                                <div className="space-y-3">
                                    <Button size="lg" className="w-full">
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        Proceed to Checkout
                                    </Button>
                                    
                                    <Link href={route('products.index')}>
                                        <Button variant="outline" size="lg" className="w-full">
                                            Continue Shopping
                                        </Button>
                                    </Link>
                                </div>
                                
                                <div className="mt-4 text-sm text-gray-600 text-center">
                                    <p>
                                        🔒 Secure checkout • 🚚 Free shipping on orders over $50
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Empty Cart */
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <div className="text-gray-400 mb-6">
                                <ShoppingCart className="w-24 h-24 mx-auto" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Looks like you haven't added any items to your cart yet.
                                Start shopping to fill it up!
                            </p>
                            <div className="space-y-4">
                                <Link href={route('products.index')}>
                                    <Button size="lg">
                                        <ShoppingBag className="w-5 h-5 mr-2" />
                                        Browse Products
                                    </Button>
                                </Link>
                                <div className="text-sm text-gray-500">
                                    <p>
                                        💡 Tip: Check out our featured products on the{' '}
                                        <Link 
                                            href={route('home')} 
                                            className="text-blue-600 hover:text-blue-700 underline"
                                        >
                                            home page
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}