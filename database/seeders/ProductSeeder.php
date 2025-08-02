<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample products with specific data
        $products = [
            [
                'name' => 'iPhone 15 Pro',
                'description' => 'The latest iPhone with titanium design and advanced camera system.',
                'price' => 999.99,
                'image_url' => 'https://picsum.photos/400/400?random=1',
                'stock' => 25,
                'category' => 'Electronics',
                'is_active' => true,
            ],
            [
                'name' => 'MacBook Air M3',
                'description' => 'Powerful laptop with M3 chip, perfect for work and creativity.',
                'price' => 1299.99,
                'image_url' => 'https://picsum.photos/400/400?random=2',
                'stock' => 15,
                'category' => 'Electronics',
                'is_active' => true,
            ],
            [
                'name' => 'Nike Air Max 270',
                'description' => 'Comfortable running shoes with responsive cushioning.',
                'price' => 150.00,
                'image_url' => 'https://picsum.photos/400/400?random=3',
                'stock' => 50,
                'category' => 'Fashion',
                'is_active' => true,
            ],
            [
                'name' => 'Coffee Maker Deluxe',
                'description' => 'Premium coffee maker with built-in grinder and programmable settings.',
                'price' => 249.99,
                'image_url' => 'https://picsum.photos/400/400?random=4',
                'stock' => 20,
                'category' => 'Home & Kitchen',
                'is_active' => true,
            ],
            [
                'name' => 'Wireless Headphones',
                'description' => 'High-quality wireless headphones with active noise cancellation.',
                'price' => 199.99,
                'image_url' => 'https://picsum.photos/400/400?random=5',
                'stock' => 30,
                'category' => 'Electronics',
                'is_active' => true,
            ],
            [
                'name' => 'Yoga Mat Premium',
                'description' => 'Non-slip yoga mat made from eco-friendly materials.',
                'price' => 49.99,
                'image_url' => 'https://picsum.photos/400/400?random=6',
                'stock' => 40,
                'category' => 'Sports',
                'is_active' => true,
            ],
            [
                'name' => 'Smart Watch Series 9',
                'description' => 'Advanced smartwatch with health monitoring and GPS.',
                'price' => 399.99,
                'image_url' => 'https://picsum.photos/400/400?random=7',
                'stock' => 35,
                'category' => 'Electronics',
                'is_active' => true,
            ],
            [
                'name' => 'Designer Backpack',
                'description' => 'Stylish and functional backpack perfect for daily use.',
                'price' => 89.99,
                'image_url' => 'https://picsum.photos/400/400?random=8',
                'stock' => 25,
                'category' => 'Fashion',
                'is_active' => true,
            ],
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }

        // Create additional random products
        Product::factory(20)->create();
    }
}