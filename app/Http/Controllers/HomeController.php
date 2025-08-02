<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with featured products.
     */
    public function index()
    {
        // Get featured products (latest 8 active products)
        $featuredProducts = Product::active()
            ->inStock()
            ->latest()
            ->take(8)
            ->get();

        // Get cart count for the current session
        $sessionId = session()->getId();
        $cartCount = CartItem::where('session_id', $sessionId)
            ->sum('quantity');

        // Get unique categories
        $categories = Product::active()
            ->distinct()
            ->pluck('category')
            ->filter()
            ->sort()
            ->values();

        return Inertia::render('welcome', [
            'featuredProducts' => $featuredProducts,
            'cartCount' => $cartCount,
            'categories' => $categories
        ]);
    }
}