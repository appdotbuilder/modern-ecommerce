import React from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ProductFiltersProps {
    categories: string[];
    filters: {
        search?: string;
        category?: string;
        sort?: string;
        direction?: string;
    };
}

export function ProductFilters({ categories, filters }: ProductFiltersProps) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        
        router.get(route('products.index'), {
            ...filters,
            search: search || undefined
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleCategoryFilter = (category: string) => {
        router.get(route('products.index'), {
            ...filters,
            category: filters.category === category ? undefined : category
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleSort = (sort: string) => {
        const direction = filters.sort === sort && filters.direction === 'asc' ? 'desc' : 'asc';
        
        router.get(route('products.index'), {
            ...filters,
            sort,
            direction
        }, {
            preserveState: true,
            replace: true
        });
    };

    const clearFilters = () => {
        router.get(route('products.index'), {}, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                    Filters
                </h2>
                
                {(filters.search || filters.category || filters.sort !== 'name') && (
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                        Clear All
                    </Button>
                )}
            </div>
            
            {/* Search */}
            <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        name="search"
                        placeholder="Search products..."
                        defaultValue={filters.search || ''}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </form>
            
            {/* Categories */}
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={filters.category === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleCategoryFilter(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>
            
            {/* Sort Options */}
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={filters.sort === 'name' ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSort('name')}
                    >
                        Name {filters.sort === 'name' && (filters.direction === 'asc' ? '↑' : '↓')}
                    </Button>
                    <Button
                        variant={filters.sort === 'price' ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSort('price')}
                    >
                        Price {filters.sort === 'price' && (filters.direction === 'asc' ? '↑' : '↓')}
                    </Button>
                    <Button
                        variant={filters.sort === 'created_at' ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSort('created_at')}
                    >
                        Newest {filters.sort === 'created_at' && (filters.direction === 'asc' ? '↑' : '↓')}
                    </Button>
                </div>
            </div>
        </div>
    );
}