<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the shopping cart.
     */
    public function index()
    {
        // Ensure session is started
        if (!session()->isStarted()) {
            session()->start();
        }
        
        $sessionId = session()->getId();
        
        $cartItems = CartItem::with('product')
            ->where('session_id', $sessionId)
            ->get();

        $total = $cartItems->sum(function ($item) {
            return $item->price * $item->quantity;
        });

        return Inertia::render('cart/index', [
            'cartItems' => $cartItems,
            'total' => $total,
            'itemCount' => $cartItems->sum('quantity')
        ]);
    }

    /**
     * Add a product to the cart.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1|max:10'
        ]);

        $product = Product::findOrFail($request->product_id);
        
        // Check if product is active and in stock
        if (!$product->is_active || $product->stock < 1) {
            return back()->withErrors(['error' => 'Product is not available.']);
        }

        // Ensure session is started
        if (!session()->isStarted()) {
            session()->start();
        }
        
        $sessionId = session()->getId();
        $quantity = $request->get('quantity', 1);

        // Check if item already exists in cart
        $cartItem = CartItem::where('session_id', $sessionId)
            ->where('product_id', $product->id)
            ->first();

        if ($cartItem) {
            // Update quantity if item exists
            $newQuantity = $cartItem->quantity + $quantity;
            
            // Check stock availability
            if ($newQuantity > $product->stock) {
                return back()->withErrors(['error' => 'Not enough stock available.']);
            }
            
            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            // Create new cart item
            if ($quantity > $product->stock) {
                return back()->withErrors(['error' => 'Not enough stock available.']);
            }
            
            CartItem::create([
                'session_id' => $sessionId,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
            ]);
        }

        return back()->with('success', 'Product added to cart!');
    }

    /**
     * Update the quantity of a cart item.
     */
    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:10'
        ]);

        // Verify this cart item belongs to the current session
        if ($cartItem->session_id !== session()->getId()) {
            abort(403);
        }

        // Check stock availability
        if ($request->quantity > $cartItem->product->stock) {
            return back()->withErrors(['error' => 'Not enough stock available.']);
        }

        $cartItem->update([
            'quantity' => $request->quantity
        ]);

        return back()->with('success', 'Cart updated!');
    }

    /**
     * Remove a cart item.
     */
    public function destroy(CartItem $cartItem)
    {
        // Verify this cart item belongs to the current session
        if ($cartItem->session_id !== session()->getId()) {
            abort(403);
        }

        $cartItem->delete();

        return back()->with('success', 'Item removed from cart!');
    }
}