<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EcommerceTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_displays_featured_products(): void
    {
        Product::factory()->count(5)->create();

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
                ->has('featuredProducts', 5)
                ->has('cartCount')
                ->has('categories')
        );
    }

    public function test_products_page_shows_all_products(): void
    {
        Product::factory()->count(3)->create();

        $response = $this->get('/products');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('products/index')
                ->has('products.data', 3)
        );
    }

    public function test_can_view_single_product(): void
    {
        $product = Product::factory()->create();

        $response = $this->get("/products/{$product->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('products/show')
                ->where('product.id', $product->id)
        );
    }

    public function test_can_add_product_to_cart(): void
    {
        $product = Product::factory()->create(['stock' => 10]);

        $response = $this->post('/cart', [
            'product_id' => $product->id,
            'quantity' => 2
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'quantity' => 2
        ]);
    }

    public function test_can_view_cart(): void
    {
        $response = $this->get('/cart');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('cart/index')
                ->has('cartItems')
                ->has('total')
                ->has('itemCount')
        );
    }

    public function test_cannot_add_out_of_stock_product(): void
    {
        $product = Product::factory()->create(['stock' => 0]);

        $response = $this->post('/cart', [
            'product_id' => $product->id,
            'quantity' => 1
        ]);

        $response->assertRedirect();
        $response->assertSessionHasErrors();
    }

    public function test_can_filter_products_by_category(): void
    {
        Product::factory()->create(['category' => 'Electronics']);
        Product::factory()->create(['category' => 'Fashion']);

        $response = $this->get('/products?category=Electronics');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->where('filters.category', 'Electronics')
        );
    }

    public function test_can_search_products(): void
    {
        Product::factory()->create(['name' => 'iPhone 15']);
        Product::factory()->create(['name' => 'MacBook Pro']);

        $response = $this->get('/products?search=iPhone');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->where('filters.search', 'iPhone')
        );
    }

    public function test_database_stores_cart_items_correctly(): void
    {
        // Create product
        $product = Product::factory()->create(['price' => 99.99, 'stock' => 10]);

        // Add product to cart
        $this->post('/cart', [
            'product_id' => $product->id,
            'quantity' => 2
        ])->assertRedirect()->assertSessionHas('success');

        // Verify database
        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'quantity' => 2,
            'price' => 99.99
        ]);

        // Verify only one cart item was created
        $this->assertDatabaseCount('cart_items', 1);
    }
}