<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_view_home_page_with_featured_products(): void
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

    public function test_can_view_products_index(): void
    {
        Product::factory()->count(3)->create();

        $response = $this->get('/products');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('products/index')
                ->has('products.data', 3)
                ->has('categories')
                ->has('filters')
        );
    }

    public function test_can_filter_products_by_category(): void
    {
        Product::factory()->create(['category' => 'Electronics']);
        Product::factory()->create(['category' => 'Fashion']);

        $response = $this->get('/products?category=Electronics');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('products/index')
                ->has('products.data', 1)
                ->where('filters.category', 'Electronics')
        );
    }

    public function test_can_search_products(): void
    {
        Product::factory()->create(['name' => 'iPhone 15']);
        Product::factory()->create(['name' => 'MacBook Pro']);

        $response = $this->get('/products?search=iPhone');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('products/index')
                ->has('products.data', 1)
                ->where('filters.search', 'iPhone')
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
                ->where('product.name', $product->name)
        );
    }

    public function test_cannot_view_inactive_product(): void
    {
        $product = Product::factory()->create(['is_active' => false]);

        $response = $this->get("/products/{$product->id}");

        $response->assertStatus(404);
    }

    public function test_can_sort_products_by_price(): void
    {
        Product::factory()->create(['price' => 100.00]);
        Product::factory()->create(['price' => 50.00]);

        $response = $this->get('/products?sort=price&direction=asc');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('products/index')
                ->where('filters.sort', 'price')
                ->where('filters.direction', 'asc')
        );
    }
}