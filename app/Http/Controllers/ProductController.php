<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::active()->inStock();

        // Filter by category if provided
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Search functionality
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sort functionality
        $sortBy = $request->get('sort', 'name');
        $sortDirection = $request->get('direction', 'asc');
        
        if (in_array($sortBy, ['name', 'price', 'created_at'])) {
            $query->orderBy($sortBy, $sortDirection);
        }

        $products = $query->paginate(12)->withQueryString();
        
        // Get unique categories for filter
        $categories = Product::active()
            ->distinct()
            ->pluck('category')
            ->filter()
            ->sort()
            ->values();

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'sort' => $sortBy,
                'direction' => $sortDirection,
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        // Only show active products
        if (!$product->is_active) {
            abort(404);
        }

        return Inertia::render('products/show', [
            'product' => $product
        ]);
    }
}