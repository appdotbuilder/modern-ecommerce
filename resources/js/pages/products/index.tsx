import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ProductCard } from '@/components/product-card';
import { ProductFilters } from '@/components/product-filters';
import { CartIcon } from '@/components/cart-icon';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
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

interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Product[];
    links: Array<{
        url?: string;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    products: PaginationData;
    categories: string[];
    filters: {
        search?: string;
        category?: string;
        sort?: string;
        direction?: string;
    };
    [key: string]: unknown;
}

export default function ProductsIndex({ products, categories, filters }: Props) {
    return (
        <>
            <Head title="All Products - ShopSmart" />
            
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
                                <Link href={route('home')}>
                                    <Button variant="ghost" size="sm">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to Home
                                    </Button>
                                </Link>
                                <CartIcon count={0} />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            All Products
                        </h1>
                        <p className="text-gray-600">
                            Showing {products.total} products
                        </p>
                    </div>

                    {/* Filters */}
                    <ProductFilters categories={categories} filters={filters} />

                    {/* Products Grid */}
                    {products.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                {products.data.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {products.last_page > 1 && (
                                <div className="flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        {products.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-3 py-2 text-sm font-medium rounded-md ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : link.url
                                                        ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                                        : 'text-gray-400 cursor-not-allowed'
                                                }`}
                                                preserveState
                                            >
                                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <ShoppingBag className="w-16 h-16 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No products found
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Try adjusting your search or filter criteria
                            </p>
                            <Link href={route('products.index')}>
                                <Button>
                                    Clear Filters
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}