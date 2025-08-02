import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ProductCard } from '@/components/product-card';
import { CartIcon } from '@/components/cart-icon';
import { ShoppingBag, Truck, Shield, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    stock: number;
    category?: string;
}

interface Props {
    featuredProducts: Product[];
    cartCount: number;
    categories: string[];
    [key: string]: unknown;
}

export default function Welcome({ featuredProducts, cartCount, categories }: Props) {
    return (
        <>
            <Head title="ShopSmart - Your Ultimate Shopping Destination" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <ShoppingBag className="w-8 h-8 text-blue-600 mr-3" />
                                <h1 className="text-2xl font-bold text-gray-900">
                                    ShopSmart
                                </h1>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={route('products.index')}
                                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    All Products
                                </Link>
                                <CartIcon count={cartCount} />
                                <Link href={route('login')}>
                                    <Button variant="outline" size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link href={route('register')}>
                                    <Button size="sm">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                🛍️ Welcome to ShopSmart
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-blue-100">
                                Your ultimate destination for quality products at great prices
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href={route('products.index')}>
                                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                                        🔍 Browse All Products
                                    </Button>
                                </Link>
                                <Link href={route('cart.index')}>
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600">
                                        🛒 View Cart ({cartCount})
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                ✨ Why Choose ShopSmart?
                            </h2>
                            <p className="text-lg text-gray-600">
                                Experience the best online shopping with our amazing features
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Truck className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    🚚 Fast Delivery
                                </h3>
                                <p className="text-gray-600">
                                    Quick and reliable shipping to your doorstep
                                </p>
                            </div>
                            
                            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    🔒 Secure Shopping
                                </h3>
                                <p className="text-gray-600">
                                    Your data and payments are completely secure
                                </p>
                            </div>
                            
                            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <HeartHandshake className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    💖 Quality Products
                                </h3>
                                <p className="text-gray-600">
                                    Carefully curated products from trusted brands
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                🏷️ Shop by Category
                            </h2>
                            <p className="text-lg text-gray-600">
                                Find exactly what you're looking for
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    href={route('products.index', { category })}
                                    className="bg-white px-6 py-3 rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                🌟 Featured Products
                            </h2>
                            <p className="text-lg text-gray-600">
                                Check out our latest and most popular items
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        
                        <div className="text-center">
                            <Link href={route('products.index')}>
                                <Button size="lg">
                                    View All Products
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            🎉 Ready to Start Shopping?
                        </h2>
                        <p className="text-xl mb-8 text-purple-100">
                            Join thousands of satisfied customers and discover amazing deals!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={route('register')}>
                                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                                    🚀 Create Account
                                </Button>
                            </Link>
                            <Link href={route('products.index')}>
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-purple-600">
                                    🛍️ Start Shopping Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-4">
                                <ShoppingBag className="w-8 h-8 text-blue-500 mr-3" />
                                <h3 className="text-2xl font-bold">ShopSmart</h3>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Your trusted partner for online shopping
                            </p>
                            <div className="flex justify-center space-x-6">
                                <Link href={route('products.index')} className="text-gray-400 hover:text-white">
                                    Products
                                </Link>
                                <Link href={route('cart.index')} className="text-gray-400 hover:text-white">
                                    Cart
                                </Link>
                                <Link href={route('login')} className="text-gray-400 hover:text-white">
                                    Login
                                </Link>
                                <Link href={route('register')} className="text-gray-400 hover:text-white">
                                    Register
                                </Link>
                            </div>
                            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400">
                                <p>&copy; 2024 ShopSmart. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}